import { Button } from '@/components/ui/button';
import { OAuthButton } from '@/components/ui/oAuthButton';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-screen md:p-4">
      <div className="relative hidden h-full w-1/2 md:block">
        <Image
          src="/assets/library.jpg"
          alt="Imagem de uma biblioteca"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-3xl"
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

        <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Bem vindo de volta!</h1>
            <p className="text-sm text-muted-foreground">
              Entre com a sua conta para aproveitar nossos resumos
            </p>
          </div>

          <OAuthButton />
        </div>
      </div>
    </div>
  );
}
