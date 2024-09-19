import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '../components/ui/header';

export default function Home() {
  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col px-5">
      <Header />

      <section className="flex flex-1 flex-col items-center justify-center gap-4">
        <h1 className="max-w-4xl text-center text-4xl font-bold md:text-6xl">
          Encontre os melhores resumos de livros em um só lugar
        </h1>
        <Button
          asChild
          size={'lg'}
          className="bg-orange-400 hover:bg-orange-500 dark:text-zinc-50"
        >
          <Link href="sign-up" className="text-xl">
            Vamos lá
          </Link>
        </Button>
      </section>
    </div>
  );
}
