import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import Search from "@/app/component/Search";
import Table from "@/app/component/Table";

export function generateMetadata() {
  const lang = "zh-TW";
  return getMetadata(lang, "products");
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const schema = getSchema("products");
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <h1 className="text-xl">產品介紹（Products）</h1>
      <Search placeholder="搜尋藥品..." />

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Table query={query} />
      </section>
    </>
  );
}
