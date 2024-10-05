'use client';

import { useRef } from 'react';

export function PlayAudio({ slug }: { slug: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return <audio src={`/books/${slug}/audiobook.mp3`} ref={audioRef} autoPlay />;
}
