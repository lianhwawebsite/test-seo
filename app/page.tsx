import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";

export function generateMetadata() {
  return getMetadata("zh-TW", "home");
}

export default function Home() {
  const schema = getSchema("home");

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <h1 className="text-xl">歡迎來到 Medicines Factory</h1>
    </>
  );
}
