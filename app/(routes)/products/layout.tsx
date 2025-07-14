import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-8 lg:px-24 my-10">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
