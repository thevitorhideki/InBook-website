'use client';

import { useUser } from '@clerk/nextjs';
import { BookIcon, Loader2 } from 'lucide-react';

export function ActionBar({ bookId }: { bookId: number }) {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="absolute bottom-5 left-1/2 flex w-11/12 -translate-x-1/2 items-center justify-between gap-3 rounded-lg bg-zinc-200 dark:bg-zinc-900">
      {(!isLoaded && (
        <div className="m-2 flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800">
          <Loader2 size={24} />
        </div>
      )) || (
        <a
          href={isSignedIn ? `/home/books/${bookId}/read` : '/sign-up'}
          className="m-2 flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800"
        >
          <BookIcon size={24} />
          <p className="text-base font-bold">Ler</p>
        </a>
      )}
    </div>
  );
}
