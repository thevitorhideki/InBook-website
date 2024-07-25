'use client';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { PricingCard } from '@/components/ui/pricing-card';
import { Check, Pause, Play } from 'lucide-react';
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
    <div className="mx-auto max-w-screen-lg">
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
              +100.000 Audiolivros
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

        <div className="mt-16 flex justify-center gap-4">
          <PricingCard
            features={[
              'Acesso ilimitado a todos os títulos',
              'Anúncios durante as obras',
            ]}
            plan="Free"
            price={0}
          />
          <PricingCard
            features={[
              'Acesso ilimitado a todos os títulos',
              'Baixe os eBooks e Audiolivros para ouvir offline',
            ]}
            plan="Premium"
            price={39.99}
          >
            <li className="grid grid-cols-min-content-auto gap-2 hover:underline">
              <Check className="h-6 w-6 text-amber-500 dark:text-amber-600" />
              <HoverCard openDelay={200}>
                <HoverCardTrigger className="font-semibold">
                  Vozes personalizadas nos Audiolivros
                </HoverCardTrigger>
                <HoverCardContent className="text-center">
                  <p>Escolha a voz que preferir durante o Audiolivro</p>
                  <Button
                    className="mt-2"
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
                </HoverCardContent>
              </HoverCard>
            </li>
          </PricingCard>
        </div>
      </section>

      <audio
        src="/assets/memorias_postumas_de_bras_cubas.mp3"
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
