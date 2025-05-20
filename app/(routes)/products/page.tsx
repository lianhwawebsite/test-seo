import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { localeMap } from "@/app/lib/localeMap";
import { SeoHead } from "@/app/component/SeoHead";

export function generateMetadata() {
  const lang = localeMap["tw"];
  return getMetadata(lang, "products");
}

export default function Page() {
  const schema = getSchema("products");

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <h1>產品介紹</h1>
    </>
  );
}
