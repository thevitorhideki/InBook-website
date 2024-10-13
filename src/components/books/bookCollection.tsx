import { booksServer } from '@/server/books';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Book } from './book';

export async function BookCollection() {
  const books = await booksServer.getAllBooks();

  if (!books) {
    return;
  }

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
              authors={book.authors}
              createdAt={book.createdAt}
              updatedAt={book.updatedAt}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
