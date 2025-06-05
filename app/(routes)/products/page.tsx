import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import ProductAllContent from "@/app/component/ProductAllContent";

export function generateMetadata() {
  const lang = "zh-TW";
  return getMetadata(lang, "products");
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    animals?: string;
    types?: string;
    page?: string;
  }>;
}) {
  const schema = getSchema("products");
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.toLowerCase() || "";
  const selectedAnimals = searchParams?.animals?.split(",") || [];
  const selectedTypes = searchParams?.types?.split(",") || [];
  const page = Number(searchParams?.page) || 1;
  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <ProductAllContent query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} />
    </>
  );
}
