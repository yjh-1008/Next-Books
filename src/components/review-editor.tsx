import { createReviewAction } from "@/actions/create-review.action";
import style from './review-editor.module.css'
import { useActionState, useEffect } from "react";
export default function ReviewEditor({bookId}: {bookId: string}) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if(state && !state.status) {
      alert(state.error);
    }
  })

  return <section>
    <form className={style.form_fontainer } action={formAction}>
      <input name="bookId" value={bookId} readOnly hidden />
      <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
      <div className={style.submit_container}>
      <input disabled={isPending} required name="author" placeholder="작성자" />
      <button type="submit" disabled={isPending} >{isPending ? '...' : '작성하기'}</button>
      </div>
    </form>
  </section>
}