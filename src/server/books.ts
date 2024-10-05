import { api } from '@/lib/api';

interface BookCollectionProps {
  id: string;
  title: string;
  slug: string;
  author: {
    name: string;
  };
}

interface BookProps {
  id: string;
  title: string;
  slug: string;
  author: {
    authorId: string;
    name: string;
    books: [{ id: string; title: string }];
  };
}

const getAllBooks = async (): Promise<BookCollectionProps[]> => {
  const res = await api.get('books');

  return res.data.books;
};

const getBookById = async (bookId: string): Promise<BookProps> => {
  const res = await api.get(`books/${bookId}`);

  return res.data;
};

const getBookBySlug = async (slug: string): Promise<BookProps> => {
  const res = await api.get(`books/slug/${slug}`);

  return res.data;
};

export const booksServer = { getAllBooks, getBookById, getBookBySlug };
