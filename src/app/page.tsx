'use client';

import { Button } from '@/components/ui/button';
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
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col">
      <Header />

      <section className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <div className="text-center">
          <h1 className="text-center text-3xl font-bold sm:text-4xl">
            Estamos construindo o maior streaming de Audiolivros e eBooks do
            Brasil, e você pode fazer parte disso!
          </h1>
          <p className="text-base">
            Responda esse rápido formulário para nos ajudar a desenvolver uma
            experiência incrível para você
          </p>
        </div>
        <Button
          asChild
          size={'lg'}
          className="bg-orange-400 hover:bg-orange-500"
        >
          <Link href="https://tally.so/r/mD1PMZ" className="text-xl">
            Vamos lá
          </Link>
        </Button>
      </section>
    </div>
  );
}
