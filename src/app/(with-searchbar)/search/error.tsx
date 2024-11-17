"use client"

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({error, reset}: {error: Error, reset: () => void}) {
  useEffect(() => {
    console.error(error.message);
  },[error])
  const router = useRouter();
  return (
    <div>
      <h3>{error.message}</h3>
      <button onClick={() => {
        startTransition(() => {
          router.refresh()
          reset();
        })
      }}>다시시도</button>
    </div>
  )
}