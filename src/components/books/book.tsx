import Image from 'next/image';

type BookProps = {
  id: number;
  title: string;
  slug: string;
  author: string;
};

export function Book({ id, title, slug, author }: BookProps) {
  return (
    <a href={`/books/${id}`} className="mr-5 max-w-44">
      <Image
        src={`/books/${slug}/cover.jpg`}
        alt="Livro"
        width={687}
        height={1000}
        className="rounded-2xl"
      />

      <div className="py-1">
        <h1 className="text-md font-semibold">{title}</h1>
        <p className="text-sm font-light">{author}</p>
      </div>
    </a>
  );
}
