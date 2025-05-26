import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";

export function generateMetadata() {
  const lang = "zh-TW"; 
  return getMetadata(lang, "contact");
}

export default function Page() {
  const schema = getSchema("contact");

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <h1>聯絡我們（Contact Us）</h1>
    </>
  );
}
