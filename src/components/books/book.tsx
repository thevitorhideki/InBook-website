import { BookProps } from '@/server/types';
import Image from 'next/image';

export function Book({ title, slug, authors }: BookProps) {
  const authorsList = authors.map((author) => author.name).join(', ');

  return (
    <a href={`/books/${slug}`} className="mr-5 max-w-44">
      <Image
        src={`/books/${slug}/cover.jpg`}
        alt="Livro"
        width={687}
        height={1000}
        className="rounded-2xl"
      />

      <div className="py-1">
        <h1 className="text-md font-semibold">{title}</h1>
        <p className="text-sm font-light">{authorsList}</p>
      </div>
    </a>
  );
}
