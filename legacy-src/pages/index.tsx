import SearchableLayout from '../components/searchable-layout';
import BookItem from '../components/book-item'
import { Book } from '../components/types'
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '../lib/fetch-books';
import fetchRandomBooks from '../lib/fetch-random-books';
import Head from 'next/head';
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
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입북스는 책을 통해 세상을 바라보는 모습을 소개하는 책 추천 서비스입니다." />
      </Head>
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