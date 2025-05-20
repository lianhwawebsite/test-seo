import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { localeMap } from "@/app/lib/localeMap";
import { SeoHead } from "@/app/component/SeoHead";

export function generateMetadata() {
  const lang = localeMap["tw"];
  return getMetadata(lang, "contact");
}

export default function Page() {
  const schema = getSchema("contact");

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <h1>聯絡我們</h1>
    </>
  );
}
