import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 md:px-24 mt-10 h-[100vh]">
      <Suspense>
        <NextBreadcrumb />
        {children}
      </Suspense>
    </div>
  );
}
