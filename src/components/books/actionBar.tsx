'use client';

import { useUser } from '@clerk/nextjs';
import { BookIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function ActionBar({ bookId }: { bookId: number }) {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="fixed bottom-5 left-1/2 flex w-11/12 -translate-x-1/2 items-center justify-between gap-3 rounded-lg bg-zinc-200 p-2 dark:bg-zinc-900">
      {!isLoaded && (
        <div className="flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800">
          <Loader2 size={24} />
        </div>
      )}
      {isLoaded && isSignedIn && (
        <a
          href={isSignedIn ? `/books/${bookId}/read` : '/sign-up'}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800"
        >
          <BookIcon size={24} />
          <p className="text-base font-bold">Ler</p>
        </a>
      )}
      {isLoaded && !isSignedIn && (
        <>
          <Link
            href="/sign-up"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-zinc-300 p-3 font-bold dark:border-zinc-800"
          >
            Cadastrar
          </Link>
          <Link
            href="/sign-in"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border-2 bg-zinc-300 p-3 font-bold dark:bg-zinc-800"
          >
            Entrar
          </Link>
        </>
      )}
    </div>
  );
}
