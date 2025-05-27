import NextBreadcrumb from "@/app/component/NextBreadcrumb";

export default function Footer() {
  return (
    <footer className="absolute bottom-5 px-10 row-start-3 flex gap-[24px] flex-wrap items-center justify-center w-full">
      <div className="w-full">
        <NextBreadcrumb homeElement={"Home"} separator={<span className="text-stone-400"> &#x2f; </span>} activeClasses="text-stone-600" containerClasses="flex py-5" listClasses="text-stone-400 hover:underline mx-2" capitalizeLinks />
      </div>
    </footer>
  );
}
