import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-17.5 lg:px-24 mt-16 mb-30 md:mt-4.75 md:mb-4.75">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
