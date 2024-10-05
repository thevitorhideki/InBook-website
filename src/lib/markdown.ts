import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), '/public/books');

export async function getBookContent(filename: string) {
  const fullPath = path.join(contentDirectory, `${filename}/book.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...(matterResult.data as { date: string; title: string; sinopse: string }),
  };
}
