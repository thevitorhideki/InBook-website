import { ActionBar } from '@/components/books/actionBar';
import Header from '@/components/ui/header';
import { getBookContent } from '@/lib/markdown';
import { booksServer } from '@/server/books';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { PlayAudio } from './playSinopse';

type BookPageProps = {
  params: {
    slug: string;
  };
};

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = params;

  const book = await booksServer.getBookBySlug(slug);

  if (!book) {
    return null;
  }

  const bookDetails = await getBookContent(book[0].slug);
  const sinopse = bookDetails.sinopse;
  const authorsList = book[0].authors.map((author) => author.name).join(', ');

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <Header />

      <div className="mx-auto max-w-screen-md pb-20">
        <div className="flex flex-col gap-3">
          <div className="relative mx-auto max-w-52">
            <Image
              src={`/books/${book[0].slug}/cover.jpg`}
              alt="book"
              width={687}
              height={1000}
              className="self-center rounded-2xl"
            />
            <PlayAudio slug={book[0].slug} />
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            <h1 className="text-center text-2xl font-semibold">
              {book[0].title}
            </h1>
            <p className="fontlight text-base">{authorsList}</p>
          </div>
        </div>

        <div className="flex flex-col py-5">
          <p className="text-xl font-semibold">Sinopse</p>

          <div className="flex flex-col gap-3 font-serif text-lg">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{sinopse}</ReactMarkdown>
          </div>
        </div>
      </div>
      <ActionBar slug={slug} />
    </div>
  );
}
