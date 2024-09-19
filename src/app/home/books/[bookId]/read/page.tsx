import { Page } from '@/components/books/page';
import fs from 'fs';
import { X } from 'lucide-react';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { books } from '../../../../../../books.json';

async function getBookContent(fileName: string) {
  const filePath = path.join(process.cwd(), 'public/books', `${fileName}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
}

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
      <header className="flex items-center justify-between p-5">
        <a href={`/home/books/${bookId}`}>
          <X size={36} color="white" />
        </a>
        <p className="text-xl font-semibold">{book.title}</p>
        <span className="h-[36px] w-[36px]"></span>
      </header>

      <Page contentHtml={contentHtml} />
    </div>
  );
}
