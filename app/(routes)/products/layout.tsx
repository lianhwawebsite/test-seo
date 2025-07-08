import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 md:px-24 my-10">
      <Suspense fallback={<Loading />}>
        <NextBreadcrumb />
        {children}
      </Suspense>
    </div>
  );
}
