import Image from 'next/image';

type BookProps = {
  id: number;
  title: string;
  author: string;
};

export function Book({ id, title, author }: BookProps) {
  return (
    <a href={`/home/books/${id}`} className="mr-5 max-w-48">
      <Image
        src={'https://placehold.co/172x172.png'}
        alt="Livro"
        width={172}
        height={172}
      />

      <div className="py-1">
        <h1 className="text-md font-semibold">{title}</h1>
        <p className="text-sm font-light">{author}</p>
      </div>
    </a>
  );
}
