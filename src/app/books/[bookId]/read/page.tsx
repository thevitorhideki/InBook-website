import { Header } from '@/components/books/header';
import { Page } from '@/components/books/page';
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
    <div className="flex h-screen flex-col">
      <Header
        variant="secondary"
        bookId={parseInt(bookId)}
        title={book.title}
      />

      <Page contentHtml={contentHtml} />
    </div>
  );
}
