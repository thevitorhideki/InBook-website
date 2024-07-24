import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { ClerkAPIError, PasswordFactor, SignInFirstFactor } from '@clerk/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const userDataSchema = z.object({
  emailAddress: z.string().email({ message: 'Email invalido' }),
});

export function Identifier() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [verifying, setVerifying] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const signInForm = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      emailAddress: '',
    },
  });

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

      const isPasswordFactor = (
        factor: SignInFirstFactor,
      ): factor is PasswordFactor => {
        return factor.strategy === 'password';
      };
      const passwordFactor = supportedFirstFactors.find(isPasswordFactor);

      if (passwordFactor) {
        setEmail(emailAddress);
        setVerifying(true);
      }
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  };

  const signInWithGoogle = async () => {
    return signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/home',
    });
  };

  return (
    <Form {...signInForm}>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
          <Image src="/assets/google.png" width={16} height={16} alt="Google" />
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

        <form onSubmit={signInForm.handleSubmit(handleSubmit)} className="grid">
          <div className="grid gap-3">
            <FormField
              control={signInForm.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Input
                        placeholder="email"
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
            {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continuar
          </Button>
        </form>
      </div>
    </Form>
  );
}
