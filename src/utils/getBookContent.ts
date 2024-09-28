import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export async function getBookContent(fileName: string) {
  const filePath = path.join(
    process.cwd(),
    `public/books/${fileName}`,
    `book.md`,
  );
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
}
