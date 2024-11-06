// import { useRouter } from "next/router";
import SearchableLayout from "../../components/searchable-layout";
// import books from "../../mock/books.json"
import BookItem from "../../components/book-item"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBook from "../../lib/fetch-book";
import { Book } from "../../components/types";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const search = query.q as string | undefined;
  
  const allBooks = await fetchBook(search);
  return { props: { allBooks } }
}
export default function Search({allBooks}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  // console.log(allBooks);
  return (
    <>
     <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입북스는 책을 통해 세상을 바라보는 모습을 소개하는 책 추천 서비스입니다." />
      </Head>
    <div>
      {allBooks.map((book: Book) => (
        <BookItem key={book.id} {...book} />
      ))} 
    </div>
    </>

  );
}

Search.getLayout = (page: React.ReactNode ) => {
  return <SearchableLayout>{page}</SearchableLayout>
}