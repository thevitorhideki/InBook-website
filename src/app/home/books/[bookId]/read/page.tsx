import { Header } from '@/components/books/header';
import { Page } from '@/components/books/page';
import fs from 'fs';
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
      <Header
        variant="secondary"
        bookId={parseInt(bookId)}
        title={book.title}
      />

      <Page contentHtml={contentHtml} />
    </div>
  );
}
