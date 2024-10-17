import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GlobalLayout from "../components/global-layout";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps & {
  Component: NextPageWithLayout;
}) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/test");
  }, []);
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
