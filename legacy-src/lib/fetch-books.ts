import type { Book } from "../components/types";
export default async function fetchBooks(searchTxt?: string): Promise<Book[]> {
  let url = "http://localhost:12345/book";
  console.log(searchTxt);
  if(searchTxt) {

    url += `/search?q=${searchTxt}`;
  }
  const response = await fetch(url);
  try{
    if(!response.ok) throw new Error("Failed to fetch books");
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
