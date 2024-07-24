'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { ClerkAPIError } from '@clerk/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Eye, EyeOff, Loader2, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const VerificationSchema = z.object({
  code: z.string().min(6, {
    message: 'Seu código de verificação deve conter 6 números',
  }),
});

const UserDataSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: 'Seu username deve conter no mínimo 6 caracteres',
    })
    .max(20, { message: 'Seu username deve conter no máximo 20 caracteres' }),
  emailAddress: z.string().email({ message: 'Email invalido' }),
  password: z.string().min(8, {
    message: 'Sua senha deve conter no mínimo 8 caracteres',
  }),
});

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();

  const verificationForm = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      code: '',
    },
  });

  const createUserForm = useForm<z.infer<typeof UserDataSchema>>({
    resolver: zodResolver(UserDataSchema),
    defaultValues: {
      username: '',
      emailAddress: '',
      password: '',
    },
  });

  const handleSubmit = async ({
    username,
    emailAddress,
    password,
  }: z.infer<typeof UserDataSchema>) => {
    setErrors(undefined);

    if (!isLoaded) return;

    try {
      setIsSigningUp(true);

      await signUp.create({
        username,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true);
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleVerification = async ({
    code,
  }: z.infer<typeof VerificationSchema>) => {
    if (!isLoaded) return;

    try {
      setIsSigningUp(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.push('/home');
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSigningUp(false);
    }
  };

  const signUpWithGoogle = async () => {
    return signUp?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/home',
    });
  };

  return (
    <div className="flex h-screen">
      <div className="relative h-full w-1/2">
        <Image
          src="/assets/library.jpg"
          alt="Imagem de uma biblioteca"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <Button className="absolute left-10 top-10" variant={'ghost'} asChild>
          <Link href="/">Voltar</Link>
        </Button>

        <Button className="absolute right-10 top-10" variant={'ghost'} asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
        {verifying ? (
          <Form {...verificationForm}>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <form
                onSubmit={verificationForm.handleSubmit(handleVerification)}
                className="grid"
              >
                <FormField
                  control={verificationForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de verificação</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS}
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Por favor, digite o código de verificação enviado ao seu
                        email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-4" type="submit" disabled={isSigningUp}>
                  {isSigningUp && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Criar conta
                </Button>
              </form>
            </div>
          </Form>
        ) : (
          <Form {...createUserForm}>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="text-center">
                <h1 className="text-2xl font-semibold">Crie uma conta</h1>
                <p className="text-sm text-muted-foreground">
                  Escreva um username, seu melhor email e uma senha para criar
                  uma conta
                </p>
              </div>

              <Button
                onClick={signUpWithGoogle}
                variant={'outline'}
                className="gap-2"
              >
                <Image
                  src="/assets/google.png"
                  width={16}
                  height={16}
                  alt="Google"
                />
                Continuar com o Google
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    ou continue com
                  </span>
                </div>
              </div>

              <form
                onSubmit={createUserForm.handleSubmit(handleSubmit)}
                className="grid"
              >
                <div className="grid gap-3">
                  <FormField
                    control={createUserForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <Input
                              placeholder="Username"
                              autoCapitalize="none"
                              autoComplete="username"
                              autoCorrect="off"
                              required
                              disabled={isSigningUp}
                              {...field}
                            />
                            {errors !== undefined &&
                              errors.filter(
                                (err) => err.meta?.paramName === 'username',
                              ).length !== 0 && (
                                <div className="flex items-center gap-2 font-medium text-destructive">
                                  <TriangleAlert className="h-4 w-4" />
                                  <p className="text-sm font-medium text-destructive">
                                    Esse username já está em uso
                                  </p>
                                </div>
                              )}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createUserForm.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <Input
                              placeholder="Email"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              required
                              disabled={isSigningUp}
                              {...field}
                            />
                            {errors !== undefined &&
                              errors.filter(
                                (err) =>
                                  err.meta?.paramName === 'email_address',
                              ).length !== 0 && (
                                <div className="flex items-center gap-2 font-medium text-destructive">
                                  <TriangleAlert className="h-4 w-4" />
                                  <p className="text-sm font-medium text-destructive">
                                    Esse email já está em uso
                                  </p>
                                </div>
                              )}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createUserForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <div className="relative flex items-center">
                              <Input
                                className="pr-8"
                                placeholder="Senha"
                                type={showPassword ? 'text' : 'password'}
                                required
                                disabled={isSigningUp}
                                {...field}
                              />
                              <div className="absolute right-3">
                                {showPassword ? (
                                  <EyeOff
                                    className="h-4 w-4"
                                    onClick={() => setShowPassword(false)}
                                  />
                                ) : (
                                  <Eye
                                    className="h-4 w-4"
                                    onClick={() => setShowPassword(true)}
                                  />
                                )}
                              </div>
                            </div>

                            {errors !== undefined &&
                              errors.filter(
                                (err) => err.meta?.paramName === 'password',
                              ).length !== 0 && (
                                <div className="flex items-center gap-2 font-medium text-destructive">
                                  <TriangleAlert className="h-4 w-4" />
                                  <p className="text-sm font-medium text-destructive">
                                    Para sua segurança, utilize uma senha mais
                                    forte
                                  </p>
                                </div>
                              )}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="mt-4" type="submit" disabled={isSigningUp}>
                  {isSigningUp && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Criar conta
                </Button>
              </form>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
