import { ActionBar } from '@/components/books/actionBar';
import Header from '@/components/ui/header';
import { getBookContent } from '@/lib/markdown';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { PlayAudio } from './playSinopse';

type BookPageProps = {
  params: {
    bookId: string;
  };
};

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = params;

  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(bookId),
    },
  });

  if (!book) {
    return null;
  }

  const bookDetails = await getBookContent(book.slug);
  const sinopse = bookDetails.sinopse;

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <Header />

      <div className="mx-auto max-w-screen-md pb-20">
        <div className="flex flex-col gap-3">
          <div className="relative mx-auto max-w-52">
            <Image
              src={`/books/${book.slug}/cover.jpg`}
              alt="book"
              width={687}
              height={1000}
              className="self-center rounded-2xl"
            />
            <PlayAudio slug={book.slug} />
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            <h1 className="text-center text-2xl font-semibold">{book.title}</h1>
            <p className="fontlight text-base">{book.author}</p>
          </div>
        </div>

        <div className="flex flex-col py-5">
          <p className="text-xl font-semibold">Sinopse</p>

          <div className="flex flex-col gap-3 font-serif text-lg">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{sinopse}</ReactMarkdown>
          </div>
        </div>
      </div>
      <ActionBar bookId={parseInt(params.bookId)} />
    </div>
  );
}
