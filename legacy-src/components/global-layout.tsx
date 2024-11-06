import Link from "next/link";
import style from "./global-layout.module.css";
export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/" prefetch={false}>ONEBITE BOOKS</Link> &nbsp;
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @winterlood</footer>
    </div>
  );
}
