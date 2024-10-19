// import { useRouter } from "next/router";
import SearchableLayout from "../../components/searchable-layout";
// import books from "../../mock/books.json"
import BookItem from "../../components/book-item"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBook from "@/lib/fetch-book";
import { Book } from "@/components/types";

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
    <div>
      {allBooks.map((book: Book) => (
        <BookItem key={book.id} {...book} />
      ))} 
    </div>
  );
}

Search.getLayout = (page: React.ReactNode ) => {
  return <SearchableLayout>{page}</SearchableLayout>
}