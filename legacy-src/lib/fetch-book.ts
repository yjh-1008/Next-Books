import { Book } from "../components/types";

export default async function fetchBook(id: string | undefined): Promise<Book | null> {
  const response = await fetch(`http://localhost:12345/book/${id}`);
  try{
    if(!response.ok) throw new Error("Failed to fetch search books");
    return await response.json();
  } catch (error) {
    console.error("Error fetching search books:", error);
    return null;
  }
} 