'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import '../../../public/books/book.css';

export function Page({ contentHtml }: { contentHtml: string }) {
  const [page, setPage] = useState(1);
  const [chapter, setChapter] = useState('');
  const pages = contentHtml.split(/<h2>/).length - 1;

  const prevPage = () => {
    if (page != 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page != pages) {
      setPage(page + 1);
    }
  };

  const extractChapter = (contentHtml: string, chapterNumber: number) => {
    const chapters = contentHtml.split(/<h2>/);

    if (chapters[chapterNumber]) {
      return `<h2>${chapters[chapterNumber]}`;
    }

    return '';
  };

  useEffect(() => {
    const chapter = extractChapter(contentHtml, page);

    setChapter(chapter);
  }, [page, contentHtml]);

  return (
    <div className="flex flex-1 flex-col justify-between gap-3 rounded-t-xl border-2 border-zinc-800 p-5">
      <div dangerouslySetInnerHTML={{ __html: chapter }} />
      <div className="mx-auto flex items-center gap-3">
        <div onClick={prevPage}>
          <ChevronLeft size={24} color={page != 1 ? 'white' : 'gray'} />
        </div>
        <p>Página {page}</p>
        <div onClick={nextPage}>
          <ChevronRight size={24} color={page != pages ? 'white' : 'gray'} />
        </div>
      </div>
    </div>
  );
}
