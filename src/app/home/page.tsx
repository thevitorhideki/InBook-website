'use client';

import { BookCollection } from '@/components/books/bookCollection';
import { useClerk, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Index() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (!isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn]);

  return (
    <div className="px-5">
      <header className="flex w-full items-center justify-between py-5">
        <h1 className="text-2xl font-semibold">
          Olá, {user?.firstName || 'bem vindo de volta'}!
        </h1>

        <button onClick={() => signOut({ redirectUrl: '/' })}>
          <Image
            className="rounded-full"
            src={user?.imageUrl || '/assets/user.jpg'}
            alt="Perfil"
            width={36}
            height={36}
          />
        </button>
      </header>

      <section className="flex flex-col gap-3">
        <BookCollection />
      </section>
    </div>
  );
}
