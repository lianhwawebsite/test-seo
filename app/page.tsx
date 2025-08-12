import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import { AllServices } from "./component/home/AllServices";

export function generateMetadata() {
  return getMetadata("zh-TW", "home");
}

export default function Home() {
  const schema = getSchema("home");
  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <AllServices />
    </>
  );
}