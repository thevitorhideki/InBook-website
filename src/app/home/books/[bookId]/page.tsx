import { ActionBar } from '@/components/books/actionBar';
import { Header } from '@/components/books/header';
import fs from 'fs';
import Image from 'next/image';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { remark } from 'remark';
import html from 'remark-html';
import bookList from '../../../../../books.json';

async function getBookContent(fileName: string) {
  const filePath = path.join(process.cwd(), 'public/books', `${fileName}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
}

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const { bookId } = params;

  const book = bookList.books.filter((book) => book.id === parseInt(bookId))[0];

  if (!book) {
    return null;
  }

  const contentHtml = await getBookContent(book.slug);
  const sinopse = contentHtml.split(/<h2>/)[0].split(/<\/h1>/)[1];

  return (
    <>
      <Header variant="primary" />

      <div className="px-5">
        <div className="flex flex-col gap-3">
          <Image
            src={`/books/${book.slug}.jpg`}
            alt="book"
            width={208}
            height={208}
            className="self-center rounded-2xl"
          />

          <div className="flex flex-1 flex-col items-center gap-2">
            <h1 className="text-center text-2xl font-semibold">{book.title}</h1>
            <p className="fontlight text-base">{book.author}</p>
          </div>
        </div>

        <div className="flex flex-col py-5">
          <p className="text-xl font-semibold">Sinopse</p>

          <div className="flex flex-col gap-3 text-justify font-serif text-lg">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{sinopse}</ReactMarkdown>
          </div>
        </div>
      </div>
      <ActionBar bookId={parseInt(params.bookId)} />
    </>
  );
}
