'use server'
export async function createReviewAction(formData: FormData) {

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
    console.log(response.status);
  }catch(err){
    console.log(err);
  }
  
}