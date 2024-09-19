'use client';

import { BookCollection } from '@/components/books/bookCollection';
import { useClerk, useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function Index() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="px-5">
      <header className="flex w-full items-center justify-between py-5">
        <h1 className="text-2xl font-semibold">
          Olá, {user?.firstName || 'seja bem-vindo'}!
        </h1>

        {user && (
          <button onClick={() => signOut({ redirectUrl: '/' })}>
            <Image
              className="rounded-full"
              src={user.imageUrl}
              alt="Perfil"
              width={36}
              height={36}
            />
          </button>
        )}
      </header>

      <section className="flex flex-col gap-3">
        <BookCollection />
      </section>
    </div>
  );
}
