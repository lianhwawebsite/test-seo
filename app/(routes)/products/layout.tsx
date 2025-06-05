import NextBreadcrumb from "@/app/component/NextBreadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 md:px-24 my-10">
      <NextBreadcrumb />
      {children}
    </div>
  );
}
