import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Suspense } from "react";

async function SearchResult({q}: {q:string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,{cache: "force-cache"});
  if(!response.ok) {
    return <div>오류 발생했습니다..</div>
  }
  const books:BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}


export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>Loading..123.</div>}>
      <SearchResult q={searchParams.q || "" }/>
    </Suspense>
  )
}
