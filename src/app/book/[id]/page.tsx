/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";
import style from "./page.module.css";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

export function generateStaticParams() {
  return [[{id: "1"},{id: "2"}, {id:"3"}]]
}

async function BookDetail({id}: {id: string}) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);

  if(!response.ok) {
    if(response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다..</div>
  }
  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = await response.json();
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}





async function ReviewList({bookId}: {bookId: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, {
    next: {tags: [`review-${bookId}`]}
  });
  console.log(response);
  if(!response.ok) {
   throw new Error(`Review fetch failed : ${response.statusText}`)
  }
  const reviews:ReviewData[] = await response.json();
  return <section>
    {reviews.map((review: ReviewData) => (
       <ReviewItem {...review} key={`review-item-${review.id}`} />
    ))}
  </section>
}

export default async function Page({
  params,
}: {
  params: { id: string};
}) {
  return (
    <div className={style.container}>
      <BookDetail id={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  )
}
