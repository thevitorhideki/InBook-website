import { BookPage } from '@/components/books/bookPage';
import Header from '@/components/ui/header';
import { getBookContent } from '@/utils/getBookContent';
import { books } from '../../../../../books.json';

export default async function ReadBook({
  params,
}: {
  params: { bookId: string };
}) {
  const { bookId } = params;
  const book = books.find((book) => book.id === parseInt(bookId));

  if (!book) {
    return null;
  }

  const contentHtml = await getBookContent(book.slug);

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl flex-col">
      <div className="px-4">
        <Header bookId={parseInt(bookId)} title={book.title} />
      </div>

      <BookPage contentHtml={contentHtml} />
    </div>
  );
}
