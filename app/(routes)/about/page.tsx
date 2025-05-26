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
      <h1> 關於我們（About Us）</h1>
      <h2>我們的使命</h2>
      <p>我們致力於提供最優質的設計與開發服務，幫助客戶實現他們的品牌願景。</p>
    </>
  );
}
