import { BookCollection } from '@/components/books/bookCollection';
import Header from '@/components/ui/header';

export default function Index() {
  return (
    <div className="px-5">
      <Header />

      <section className="flex flex-col gap-3">
        <BookCollection />
      </section>
    </div>
  );
}
