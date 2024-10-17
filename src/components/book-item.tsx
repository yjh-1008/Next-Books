import { Book } from './types'
import Link from 'next/link'
import style from './book-item.module.css'
export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl
}: Book) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <img src={coverImgUrl} alt={title} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br/>
        <p className={style.author}>{author} | {publisher}</p> 
      </div>
    </Link>
  )
}