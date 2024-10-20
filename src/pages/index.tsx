import SearchableLayout from '../components/searchable-layout';
import BookItem from '../components/book-item'
import { Book } from '../components/types'
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// export const getServerSideProps: GetServerSideProps = async () => {
//   const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
//   return { props: { allBooks, randomBooks } }
// }

export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
  return { props: { allBooks, randomBooks }}
}

export default function Home({allBooks, randomBooks}:InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section>
        <h3>등록된 모든 도서</h3>
          {randomBooks?.map((book: Book) => <BookItem key={book.id} {...book} />)}
      </section>
      <section>
        <h3>지금 추천하는 도서</h3>
        {allBooks?.map((book: Book) => <BookItem key={book.id} {...book} />)}
      </section>
    </>
  );
}

Home.getLayout = (page: React.ReactNode ) => {
  return <SearchableLayout>{page}</SearchableLayout>
}