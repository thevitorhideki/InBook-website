import { prisma } from '@/lib/prisma';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Book } from './book';

export async function BookCollection() {
  const books = await prisma.book.findMany();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg dark:text-zinc-200">Nossas obras mais lidas</h2>
      </div>

      <ScrollArea className="overflow-auto">
        <div className="flex w-max">
          {books.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              slug={book.slug}
              author={book.author}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
