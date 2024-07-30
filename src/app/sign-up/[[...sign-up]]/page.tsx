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

const EmailSchema = z.object({
  emailAddress: z.string().email({ message: 'Email invalido' }),
});

const ProfileSchema = z.object({
  firstName: z.string({ message: 'Seu primeiro nome não pode estar vazio' }),
  lastName: z.string({ message: 'Seu sobrenome não pode estar vazio' }),
  username: z.string({ message: 'Seu username não pode estar vazio' }).min(6, {
    message: 'Seu username deve conter no mínimo 6 caracteres',
  }),
});

const PasswordSchema = z.object({
  password: z.string().min(8, {
    message: 'Sua senha deve conter no mínimo 8 caracteres',
  }),
});

enum FormSteps {
  'EMAIL' = 'email',
  'PROFILE' = 'profile',
  'PASSWORD' = 'password',
  'VERIFYING' = 'verifying',
}

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [steps, setSteps] = useState(FormSteps.EMAIL);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();

  const emailForm = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      emailAddress: '',
    },
  });

  const verificationForm = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      code: '',
    },
  });

  const profileForm = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  if (!signUp) return null;

  const handleEmailAddress = async ({
    emailAddress,
  }: z.infer<typeof EmailSchema>) => {
    setErrors(undefined);

    if (!isLoaded) return;

    try {
      setIsSigningUp(true);

      await signUp.create({ emailAddress });

      setSteps(FormSteps.PROFILE);
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleProfile = async ({
    firstName,
    lastName,
    username,
  }: z.infer<typeof ProfileSchema>) => {
    setErrors(undefined);

    try {
      setIsSigningUp(true);

      await signUp.update({
        firstName,
        lastName,
        username,
      });

      setSteps(FormSteps.PASSWORD);
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSigningUp(false);
    }
  };

  const handlePassword = async ({
    password,
  }: z.infer<typeof PasswordSchema>) => {
    setErrors(undefined);

    if (!isLoaded) return;

    try {
      setIsSigningUp(true);

      await signUp.update({ password });

      await signUp.prepareEmailAddressVerification();

      setSteps(FormSteps.VERIFYING);
    } catch (error) {
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

  const signUpWithGoogle = () => {
    return signUp.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-up/sso-callback',
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

        {steps === FormSteps.EMAIL && (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Crie uma conta</h1>
              <p className="text-sm text-muted-foreground">
                Escreva o seu melhor email para continuar
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
            <Form {...emailForm}>
              <form
                className="grid"
                onSubmit={emailForm.handleSubmit(handleEmailAddress)}
              >
                <div className="grid gap-3">
                  <FormField
                    control={emailForm.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <>
                            <Input
                              placeholder="exemplo@email.com"
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
                                <div className="grid grid-cols-min-content-auto items-center gap-2 font-medium text-destructive">
                                  <TriangleAlert className="h-4 w-4" />
                                  <p className="text-sm font-medium text-destructive">
                                    Esse email já está em uso, vá para a página
                                    de{' '}
                                    <Link
                                      className="font-semibold underline"
                                      href={'/sign-in'}
                                    >
                                      Login
                                    </Link>{' '}
                                    para continuar.
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
                  Continuar
                </Button>
              </form>
            </Form>
          </div>
        )}

        {steps === FormSteps.PROFILE && (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Crie o seu perfil</h1>
              <p className="text-sm text-muted-foreground">
                Preencha essas informações para ter uma experiência
                personalizada
              </p>
            </div>

            <Form {...profileForm}>
              <form
                className="grid"
                onSubmit={profileForm.handleSubmit(handleProfile)}
              >
                <div className="grid gap-3">
                  <div className="flex gap-3">
                    <FormField
                      control={profileForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primeiro nome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="João"
                              type="text"
                              autoComplete="name"
                              autoCorrect="off"
                              required
                              disabled={isSigningUp}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobrenome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Silva"
                              type="text"
                              autoComplete="family-name"
                              autoCorrect="off"
                              required
                              disabled={isSigningUp}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usuário</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="joaosilva"
                              type="text"
                              autoComplete="username"
                              autoCorrect="off"
                              required
                              disabled={isSigningUp}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Essa informação ficará visível para outros usuários
                          </FormDescription>
                          <FormMessage />
                          {errors !== undefined && (
                            <div className="flex items-center gap-2 font-medium text-destructive">
                              <TriangleAlert className="h-4 w-4" />
                              <p className="text-sm font-medium text-destructive">
                                Esse nome de usuário já está em uso
                              </p>
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button className="mt-4" type="submit" disabled={isSigningUp}>
                  {isSigningUp && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Continuar
                </Button>
              </form>
            </Form>
          </div>
        )}

        {steps === FormSteps.PASSWORD && (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Senha</h1>
              <p className="text-sm text-muted-foreground">
                Crie uma senha forte para proteger a sua conta
              </p>
            </div>
            <Form {...passwordForm}>
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <form
                  onSubmit={passwordForm.handleSubmit(handlePassword)}
                  className="grid"
                >
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <div className="relative flex items-center">
                              <Input
                                className="pr-8"
                                placeholder="#SenhaForte123"
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

                            {errors !== undefined && (
                              <div className="flex items-center gap-2 font-medium text-destructive">
                                <TriangleAlert className="h-4 w-4" />
                                <p className="text-sm font-medium text-destructive">
                                  Senha Incorreta
                                </p>
                              </div>
                            )}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="mt-4" type="submit" disabled={isSigningUp}>
                    {isSigningUp && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Continuar
                  </Button>
                </form>
              </div>
            </Form>
          </div>
        )}

        {steps === FormSteps.VERIFYING && (
          <Form {...verificationForm}>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="text-center">
                <h1 className="text-2xl font-semibold">Verificação</h1>
                <p className="text-sm text-muted-foreground">
                  Verifique o seu email para confirmar a sua conta
                </p>
              </div>
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
                          <div className="grid gap-2">
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                            {errors !== undefined &&
                              errors.filter(
                                (err) => err.meta?.paramName === 'code',
                              ).length !== 0 && (
                                <div className="grid grid-cols-min-content-auto items-center gap-2 font-medium text-destructive">
                                  <TriangleAlert className="h-4 w-4" />
                                  <p className="text-sm font-medium text-destructive">
                                    Código inválido
                                  </p>
                                </div>
                              )}
                          </div>
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
        )}
      </div>
    </div>
  );
}
