import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import { ServiceFirst } from "./component/home/ServiceFirst";
import { ServiceSecond } from "./component/home/ServiceSecond";
import { ServiceThird } from "./component/home/ServiceThird";
import { ServiceFourth } from "./component/home/ServiceFourth";
import data from "@/data.json";

export function generateMetadata() {
  return getMetadata("zh-TW", "home");
}

export default function Home() {
  const schema = getSchema("home");
  const { title, description, services } = data.home;
  const productPage = data.navbarItems.find((page) => page.label === "產品一覽");

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <ServiceFirst title={title} description={description} />
      <ServiceSecond data={services[0]} />
      <ServiceThird data={services[1]} productPage={productPage} />
      <ServiceFourth data={services[2]} />
    </>
  );
}
