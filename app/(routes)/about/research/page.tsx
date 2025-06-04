import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";

export function generateMetadata() {
  const lang = "zh-TW"; 
  return getMetadata(lang, "about");
}

export default function Page() {
  const schema = getSchema("about");

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <h1 className="text-xl">品質研發</h1>
    </>
  );
}
