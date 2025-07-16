import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8 lg:px-24 my-12">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
