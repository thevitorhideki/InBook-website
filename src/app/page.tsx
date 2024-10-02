import { BookCollection } from '@/components/books/bookCollection';
import Header from '@/components/ui/header';

export default function Index() {
  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <Header />

      <main>
        <section className="flex flex-col gap-3">
          <BookCollection />
        </section>
      </main>
    </div>
  );
}
