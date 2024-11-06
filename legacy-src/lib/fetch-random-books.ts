import type { Book } from "../components/types";
export default async function fetchRandomBooks(): Promise<Book[] | null> {
  const response = await fetch("http://localhost:12345/book/random");
  try{
    if(!response.ok) throw new Error("Failed to fetch random books");
    return await response.json();
  } catch (error) {
    console.error("Error fetching random books:", error);
    return null;
  }
}   