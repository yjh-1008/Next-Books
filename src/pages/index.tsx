import SearchableLayout from '../components/searchable-layout';
import style from './index.module.css'
import books from '../mock/books.json'
import BookItem from '../components/book-item'
import { Book } from '../components/types'
export default function Home() {
  return (
    <>
    <section>
      <h3>지금 추천하는 도서</h3>
      {books.map((book: Book) => <BookItem key={book.id} {...book} />)}
    </section>
    <section>
      <h3>등록된 모든 도서</h3>
      {books.map((book: Book) => <BookItem key={book.id} {...book} />)}
    </section>
    </>
  );
}

Home.getLayout = (page: React.ReactNode ) => {
  return <SearchableLayout>{page}</SearchableLayout>
}