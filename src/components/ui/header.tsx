'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

type HeaderProps = {
  slug?: string;
  title?: string;
};

export default function Header({ slug, title }: HeaderProps) {
  const { setTheme } = useTheme();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex items-center justify-between py-4 backdrop-blur">
      <div className="w-1/4">
        <Button variant={'ghost'} asChild>
          {slug ? (
            <Link href={`/books/${slug}`}>
              <ArrowLeft width={24} />
            </Link>
          ) : (
            <Link href="/">
              <p className="text-2xl font-semibold">InBook</p>
            </Link>
          )}
        </Button>
      </div>

      {slug && (
        <h1 className="w-1/2 text-center text-xl font-semibold">{title}</h1>
      )}

      <div
        className={clsx('mr-4 flex w-1/4 justify-end gap-3', {
          'w-auto': !slug,
        })}
      >
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

        {!slug && (
          <>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <Button asChild variant={'ghost'}>
                <Link href="/sign-in" className="flex items-center gap-1">
                  Entrar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </SignedOut>
          </>
        )}
      </div>
    </header>
  );
}
