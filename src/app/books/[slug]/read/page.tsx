import { BookPage } from '@/components/books/bookPage';
import Header from '@/components/ui/header';
import { getBookContent } from '@/lib/markdown';
import { booksServer } from '@/server/books';
import { PlayAudio } from './playAudiobook';

export default async function ReadBook({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const book = await booksServer.getBookBySlug(slug);

  if (!book) {
    return null;
  }

  const contentHtml = (await getBookContent(book.slug)).contentHtml;

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl flex-col">
      <div className="px-4">
        <Header slug={slug} title={book.title} />
      </div>

      <BookPage contentHtml={contentHtml} />
      <PlayAudio slug={book.slug} />
    </div>
  );
}
