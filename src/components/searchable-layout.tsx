import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import styles from "./searchable-layout.module.css";
export default function SearchableLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<string>("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      onSearch();
    }
  };
  const q = router.query.q as string;
  useEffect(() => {
    if(q) setState(q);
  },[q]);
  const onSearch = () => {
    if(!state) return;
    if(q === state) return;
    router.push(`/search?q=${state}`);
  };
  return (
    <div>
      <div className={styles.searchable_container} >
      <input  onKeyDown={onKeyDown}  value={state} onChange={onChangeSearch} type="text" placeholder="검색어를 입력하세요" />
      <button onClick={onSearch}>검색</button>
    </div>
    {children}
    </div>
  );
}
