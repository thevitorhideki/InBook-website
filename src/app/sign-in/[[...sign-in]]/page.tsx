'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import {
  ClerkAPIError,
  EmailCodeFactor,
  OAuthStrategy,
  PasswordFactor,
  SignInFirstFactor,
} from '@clerk/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  Eye,
  EyeOff,
  KeyRoundIcon,
  Loader2,
  Mail,
  PenLine,
  TriangleAlert,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const otpVerificationSchema = z.object({
  code: z.string().min(6, {
    message: 'Seu código de verificação deve conter 6 números',
  }),
});

const passwordVerificationSchema = z.object({
  password: z.string(),
});

const userDataSchema = z.object({
  emailAddress: z.string().email({ message: 'Email invalido' }),
});

type VerificationStrategies =
  | 'password'
  | 'email_code'
  | 'email_link'
  | 'phone_code'
  | 'passkey'
  | 'reset_password_phone_code'
  | 'reset_password_email_code'
  | 'web3_metamask_signature'
  | OAuthStrategy
  | 'saml';

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [email, setEmail] = useState('');
  const [emailAddressId, setEmailAddressId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [supportedStrategies, setSupportedStrategies] = useState<
    VerificationStrategies[]
  >([]);
  const [selectedStrategy, setSelectedStrategy] =
    useState<VerificationStrategies | null>('password');
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const router = useRouter();

  const signInForm = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      emailAddress: '',
    },
  });

  const otpVerificationForm = useForm<z.infer<typeof otpVerificationSchema>>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      code: '',
    },
  });

  const passwordVerificationForm = useForm<
    z.infer<typeof passwordVerificationSchema>
  >({
    resolver: zodResolver(passwordVerificationSchema),
    defaultValues: {
      password: '',
    },
  });

  if (!signIn) return null;

  const handleSubmit = async ({
    emailAddress,
  }: z.infer<typeof userDataSchema>) => {
    setErrors(undefined);

    if (!isLoaded && !signIn) return;

    try {
      setIsSigningIn(true);

      const { supportedFirstFactors } = await signIn.create({
        identifier: emailAddress,
      });

      setSupportedStrategies(
        supportedFirstFactors.map((factor) => factor.strategy),
      );

      const isPasswordFactor = (
        factor: SignInFirstFactor,
      ): factor is PasswordFactor => {
        return factor.strategy === 'password';
      };
      const passwordFactor = supportedFirstFactors.find(isPasswordFactor);

      const isEmailOTPFactor = (
        factor: SignInFirstFactor,
      ): factor is EmailCodeFactor => {
        return factor.strategy === 'email_code';
      };
      const emailCodeFactor = supportedFirstFactors.find(isEmailOTPFactor);

      setEmail(emailAddress);

      if (emailCodeFactor) {
        setEmailAddressId(emailCodeFactor.emailAddressId);
      }

      if (passwordFactor) {
        setVerifying(true);
        setSelectedStrategy('password');
      } else if (emailCodeFactor) {
        const { emailAddressId } = emailCodeFactor;

        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        });

        setVerifying(true);
        setSelectedStrategy('email_code');
      }
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  };

  async function handlePasswordVerification({
    password,
  }: z.infer<typeof passwordVerificationSchema>) {
    if (!isLoaded && !signIn) return null;

    try {
      setIsSigningIn(true);

      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'password',
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push('/home');
      } else {
        console.error(signInAttempt);
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error('Error:', JSON.stringify(error, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  }

  async function handleOTPVerification({
    code,
  }: z.infer<typeof otpVerificationSchema>) {
    if (!isLoaded && !signIn) return null;

    try {
      setIsSigningIn(true);

      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push('/home');
      } else {
        console.error(signInAttempt);
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error('Error:', JSON.stringify(error, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  }

  async function sendEmailCode() {
    if (!isLoaded && !signIn) return null;

    try {
      await signIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId,
      });
    } catch (error) {}
  }

  const signInWithGoogle = () => {
    return signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-in/sso-callback',
      redirectUrlComplete: '/home',
    });
  };

  return (
    <div className="flex h-screen">
      <div className="relative hidden h-full w-1/2 md:block">
        <Image
          src="/assets/library.jpg"
          alt="Imagem de uma biblioteca"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <Button
          className="absolute left-5 top-5 md:left-10 md:top-10"
          variant={'ghost'}
          asChild
        >
          <Link href="/">Voltar</Link>
        </Button>

        <Button
          className="absolute right-5 top-5 md:right-10 md:top-10"
          variant={'ghost'}
          asChild
        >
          <Link href="/sign-up">Criar conta</Link>
        </Button>

        {!verifying ? (
          <Form {...signInForm}>
            <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold">Bem vindo de volta!</h1>
                <p className="text-sm text-muted-foreground">
                  Escreva o seu email entrar
                </p>
              </div>

              <Button
                onClick={signInWithGoogle}
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
                onSubmit={signInForm.handleSubmit(handleSubmit)}
                className="grid"
              >
                <div className="grid gap-3">
                  <FormField
                    control={signInForm.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <>
                            <Input
                              placeholder="exemplo@email.com"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              required
                              {...field}
                            />
                            {errors !== undefined && (
                              <div className="flex items-center gap-2 font-medium text-destructive">
                                <TriangleAlert className="h-4 w-4" />
                                <p className="text-sm font-medium text-destructive">
                                  Informações de login incorretas
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

                <Button className="mt-4" type="submit" disabled={isSigningIn}>
                  {isSigningIn && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Continuar
                </Button>
              </form>
            </div>
          </Form>
        ) : (
          (verifying && selectedStrategy === 'password' && (
            <Form {...passwordVerificationForm}>
              <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold">Digite sua senha</h1>
                  <p className="text-sm text-muted-foreground">
                    Digite a senha associada a sua conta
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-muted-foreground">{email}</p>
                    <PenLine
                      className="h-4 w-4 text-orange-500"
                      onClick={() => setVerifying(false)}
                    />
                  </div>
                </div>

                <form
                  onSubmit={passwordVerificationForm.handleSubmit(
                    handlePasswordVerification,
                  )}
                  className="mt-4 grid"
                >
                  <FormField
                    control={passwordVerificationForm.control}
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
                                disabled={isSigningIn}
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
                  <Button className="mt-4" type="submit" disabled={isSigningIn}>
                    {isSigningIn && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Entrar
                  </Button>
                </form>
                <Button
                  variant={'link'}
                  onClick={() => {
                    setSelectedStrategy(null);
                  }}
                >
                  Outro método de login
                </Button>
              </div>
            </Form>
          )) ||
          (verifying && selectedStrategy === 'email_code' && (
            <Form {...otpVerificationForm}>
              <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold">
                    Código de Verificação
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enviamos um código para o seu email
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-muted-foreground">{email}</p>
                    <PenLine
                      className="h-4 w-4 text-orange-500"
                      onClick={() => setVerifying(false)}
                    />
                  </div>
                </div>

                <form
                  onSubmit={otpVerificationForm.handleSubmit(
                    handleOTPVerification,
                  )}
                  className="mt-4 grid"
                >
                  <div className="mx-auto">
                    <FormField
                      control={otpVerificationForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="mt-4" type="submit" disabled={isSigningIn}>
                    {isSigningIn && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Entrar
                  </Button>
                </form>
                <Button
                  variant={'link'}
                  onClick={() => {
                    setSelectedStrategy(null);
                  }}
                >
                  Outro método de login
                </Button>
              </div>
            </Form>
          )) ||
          (selectedStrategy === null && (
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="text-center">
                <h1 className="text-2xl font-semibold">Métodos de login</h1>
                <p className="text-sm text-muted-foreground">
                  Escolha um método de login para entrar
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {supportedStrategies.includes('oauth_google') && (
                  <Button
                    onClick={signInWithGoogle}
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
                )}

                {supportedStrategies.includes('password') && (
                  <Button
                    variant={'outline'}
                    className="gap-2"
                    onClick={() => setSelectedStrategy('password')}
                  >
                    <KeyRoundIcon className="h-4 w-4" />
                    Senha
                  </Button>
                )}

                {supportedStrategies.includes('email_code') && (
                  <Button
                    variant={'outline'}
                    className="gap-2"
                    onClick={() => {
                      setSelectedStrategy('email_code');
                      sendEmailCode();
                    }}
                  >
                    <Mail className="h-4 w-4" />
                    Enviar código para o email
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
