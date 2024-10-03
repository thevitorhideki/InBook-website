'use client';

import { useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { Button } from './button';

export function OAuthButton() {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWithGoogle = () => {
    return signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-in/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  return (
    <Button onClick={signInWithGoogle} variant={'outline'} className="gap-2">
      <Image src="/assets/google.png" width={16} height={16} alt="Google" />
      Continuar com o Google
    </Button>
  );
}
