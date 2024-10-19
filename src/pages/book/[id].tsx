/* eslint-disable @next/next/no-img-element */
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css'
import fetchBook from '@/lib/fetch-book';
import { useRouter } from 'next/router';


// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const { params } = context;
//   const id = params!.id as string;
//   const book = await fetchBook(id);
//   return { props: { book } }
// }

export const getStaticPaths = async () => {
  //fallback: false 는 페이지가 없으면 404 페이지를 보여줌
  // const allBooks = await fetchBook();
  return { paths: [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
  ], fallback: true};
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id as string;
  const book = await fetchBook(id);
  return { props: { book } }
}

export default function Book({
  book
}:InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if(router.isFallback) return <div>Loading...</div>;
  if(!book) return <div>Book not found</div>;
  return (
    <div className={style.container}>
        <div className={style.cover_img_container} style={{ backgroundImage: `url(${book?.coverImgUrl})` }}>
        <img src={book?.coverImgUrl} alt="섬네일" />
      </div>
      <div>
        <div className={style.title}>{book?.title}</div>
          <div className={style.subTitle}>{book?.subTitle}</div>
        <br/>
        <div className={style.author}>{book?.author} | {book?.publisher}</div>
        <div className={style.description}>{book?.description}</div>
      </div>
    </div>
  )
}
