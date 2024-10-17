import { useRouter } from "next/router";
import SearchableLayout from "../../components/searchable-layout";
import books from "../../mock/books.json"
import BookItem from "../../components/book-item"
export default function Search() {
  const router = useRouter();
  const { query } = router.query;
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))} 
    </div>
  );
}

Search.getLayout = (page: React.ReactNode ) => {
  return <SearchableLayout>{page}</SearchableLayout>
}