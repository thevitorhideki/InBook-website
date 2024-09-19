import { BookIcon } from 'lucide-react';

export function ActionBar({ bookId }: { bookId: number }) {
  return (
    <div className="absolute bottom-0 mx-auto mb-5 flex w-11/12 items-center justify-between gap-3 rounded-lg bg-zinc-900">
      <a
        href={`/home/books/${bookId}/read`}
        className="m-2 flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-800 p-3"
      >
        <BookIcon size={24} />
        <p className="text-base font-bold">Ler</p>
      </a>
    </div>
  );
}
