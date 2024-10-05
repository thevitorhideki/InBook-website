import { BookPage } from '@/components/books/bookPage';
import Header from '@/components/ui/header';
import { getBookContent } from '@/lib/markdown';
import { prisma } from '@/lib/prisma';
import { PlayAudio } from './playAudiobook';

export default async function ReadBook({
  params,
}: {
  params: { bookId: string };
}) {
  const { bookId } = params;
  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(bookId),
    },
  });

  if (!book) {
    return null;
  }

  const contentHtml = (await getBookContent(book.slug)).contentHtml;

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl flex-col">
      <div className="px-4">
        <Header bookId={parseInt(bookId)} title={book.title} />
      </div>

      <BookPage contentHtml={contentHtml} />
      <PlayAudio slug={book.slug} />
    </div>
  );
}
