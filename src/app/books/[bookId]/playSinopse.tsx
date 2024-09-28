'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function PlayAudio({ slug }: { slug: string }) {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (play) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  return (
    <div className="absolute -bottom-2 -right-2 rounded-full border-2 border-zinc-950 bg-zinc-50 p-2 dark:border-none">
      <div onClick={togglePlay}>
        {!play ? (
          <Play size={28} color="black" />
        ) : (
          <Pause size={28} color="black" />
        )}
      </div>
      <audio
        src={`/books/${slug}/sinopse.mp3`}
        ref={audioRef}
        autoPlay={false}
        onEnded={() => setPlay(false)}
      />
    </div>
  );
}
