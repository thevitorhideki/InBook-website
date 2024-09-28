'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

export default function Header() {
  const { setTheme } = useTheme();
  const { isLoaded, user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return <div className="py-[36px]"></div>;
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex items-center justify-between py-4 backdrop-blur">
      <h1 className="text-2xl font-bold">
        Olá, {user?.firstName ? user?.firstName : 'bem-vindo'}
      </h1>

      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Escuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {(isSignedIn && (
          <button onClick={() => signOut({ redirectUrl: '/' })}>
            <Image
              className="rounded-full"
              src={user.imageUrl}
              alt="Perfil"
              width={36}
              height={36}
            />
          </button>
        )) || (
          <div className="flex flex-1 justify-center">
            <Button asChild variant={'outline'}>
              <Link href="sign-in" className="flex items-center gap-1">
                Entrar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
