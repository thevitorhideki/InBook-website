'use client';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/ui/header';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <Header />

      <section className="flex flex-col items-center justify-center gap-4 pt-72">
        <h1 className="max-w-4xl text-center text-6xl font-bold">
          A maior biblioteca do mundo na palma da sua mão
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
        <p>
          Já tenho cadastro.{' '}
          <Link className="font-semibold hover:underline" href="sign-in">
            Entrar
          </Link>
        </p>
      </section>

      <section
        id="features"
        className="flex flex-col items-center justify-center pt-80"
      >
        <h1 className="text-3xl font-bold">
          Venha ter uma nova experiência com os seus livros favoritos
        </h1>
        <div className="mt-16 grid grid-cols-3 gap-16 text-xl">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/300/png"
              alt="Dispositivos"
              width={200}
              height={200}
            />
            <p>Acesse onde e quando quiser</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/300/png"
              alt="Dispositivos"
              width={200}
              height={200}
            />
            <p>Escute um trecho desse livro</p>
            <Button
              variant={'outline'}
              size={'icon'}
              onClick={() =>
                isPlaying ? setIsPlaying(false) : setIsPlaying(true)
              }
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/300/png"
              alt="Dispositivos"
              width={200}
              height={200}
            />
            <p>
              +200.000 eBooks <br />
              +100.000 Audiobooks
            </p>
          </div>
        </div>
      </section>
      <section
        id="plans"
        className="flex flex-col items-center justify-center py-80"
      >
        <h1 className="text-3xl font-bold">
          Tenha uma experiência ainda melhor com o nosso plano{' '}
          <span className="text-amber-500">PREMIUM</span>
        </h1>
        <div className="mt-16 flex justify-center gap-8">
          <div className="w-2/5 rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Free</h2>
              <p>R$0,00</p>
            </div>
            <ul className="mt-4 list-inside list-disc marker:text-slate-400">
              <li>Acesso ilimitado aos eBooks e audiobooks</li>
              <li>Anúncios a cada capitulo</li>
            </ul>
          </div>
          <div className="w-2/5 rounded-xl border-2 border-amber-500 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-amber-500">PREMIUM</h2>
              <p>R$39.90/mês</p>
            </div>
            <ul className="mt-4 list-inside list-disc marker:text-amber-500">
              <li>Acesso ilimitado aos eBooks e audiobooks</li>
              <li className="hover:underline">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger className="font-semibold">
                    Vozes personalizadas nos audiobooks
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Experiência inédita na qual você pode ouvir a voz do seu
                    personagem favorito ou até o autor da obra
                  </HoverCardContent>
                </HoverCard>
              </li>
              <li>Baixe os eBooks e audiobooks para ouvir offline</li>
            </ul>
          </div>
        </div>
        <Button
          asChild
          size={'lg'}
          className="mt-6 bg-orange-400 hover:bg-orange-500 dark:text-zinc-50"
        >
          <Link href="sign-up" className="text-xl">
            Vamos lá
          </Link>
        </Button>
      </section>

      <audio
        src="/assets/memorias_postumas_de_bras_cubas.mp3"
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </>
  );
}
