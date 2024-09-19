import { ActionBar } from '@/components/books/actionBar';
import { Header } from '@/components/books/header';
import Image from 'next/image';
import bookList from '../../../../../books.json';

export default function BookPage({ params }: { params: { bookId: string } }) {
  const { bookId } = params;

  const book = bookList.books.filter((book) => book.id === parseInt(bookId))[0];

  return (
    <>
      <Header variant="primary" />

      <div className="px-5">
        <div className="flex flex-col gap-3">
          <Image
            src={'https://placehold.co/208x208.png'}
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
          <p className="text-lg font-semibold">Sinopse</p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            incidunt quaerat ipsum blanditiis quis unde rem beatae commodi.
            Quisquam at totam eius optio reiciendis dignissimos error, saepe ad
            fugit quos!
          </p>
        </div>
      </div>
      <ActionBar bookId={parseInt(params.bookId)} />
    </>
  );
}
