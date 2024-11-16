import BookItemSkeleton from "./book-item-skeleton"
export default function BookListSkeleton({
  count
}:{
  count: number
}) {
  return new Array(count).fill(0).map((_, index) => {
    return <BookItemSkeleton key={`book-item-skeleton_${index}`} />
  });
}