import "@/app/lib/globals.css";
import { Suspense } from "react";
import Loading from "@/app/(en-routes)/en/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}

