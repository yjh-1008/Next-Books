'use server'

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(_:any, formData: FormData) {

  console.log('server action called')
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();
  if(!content || !author) {
    return;
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,{
      method:"POST",
      body: JSON.stringify({content, author, bookId})
    })
    //1. 특정 주소의 해당하는 페이지만 재검증
    revalidatePath(`/book/${bookId}`);

    //2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/book/[id]',"page");
    //3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    // revalidatePath('/(with-wearchbar)',"layout");
    //4. 모든 데이터 재검증
    // revalidatePath("/", "layout");
    //5 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`)
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    return {
      status: true,
      error: "",
    }
  }catch(err){
    console.log(err);
    return {
      status: false,
      error:`리뷰 저장에 실패했습니다. ${err}`,
    }
  }
  
}