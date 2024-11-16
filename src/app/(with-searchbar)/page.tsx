import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

export const dynamic = "force-dynamic"
//특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto
// 2. force-dynamic
// 3. force-static
// 4. error

 async function AllBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,{cache: "force-cache"});
  const allBooks:BookData[] = await response.json();
  if(!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  return (
    <>
    {allBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
    </>
  )
}

async function RecoBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,{cache:"force-cache"});
  const allBooks:BookData[] = await response.json();
  if(!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  return (
    <>
    {allBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
    </>
  )
}


export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        <Suspense fallback={
            <BookListSkeleton count={5} />
        }>
          <AllBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={5} />}>
          <RecoBooks />
        </Suspense>
      </section>
    </div>
  );
}
