import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:px-24 mt-10">
      <Suspense>
        <div className="px-6 md:px-0">
          <NextBreadcrumb />
        </div>
        {children}
      </Suspense>
    </div>
  );
}
