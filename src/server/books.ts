import { api } from '@/lib/api';
import { BookProps } from './types';

const getAllBooks = async (): Promise<BookProps[]> => {
  const res = await api.get('books');

  return res.data;
};

const getBookById = async (bookId: string): Promise<BookProps> => {
  const res = await api.get(`books/${bookId}`);

  return res.data;
};

const getBookBySlug = async (slug: string): Promise<BookProps[]> => {
  const res = await api.get(`books?slug=${slug}`);

  return res.data;
};

export const booksServer = { getAllBooks, getBookById, getBookBySlug };
