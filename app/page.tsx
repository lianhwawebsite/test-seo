import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import data from "@/data.json";
import { Fragment } from "react";
import Link from "next/link";

export function generateMetadata() {
  return getMetadata("zh-TW", "home");
}

export default function Home() {
  const schema = getSchema("home");
  const { title, description } = data.home;
  const productPage = data.navbarItems.find((page) => page.label === "產品一覽");
  const titleArr = title.split("，");
  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <div className="bg-stone-200 w-full h-96 md:h-[572px] grid md:grid-cols-7 p-10 md:p-24">
        <div className="order-2 md:order-1 md:col-span-4 flex flex-col justify-center items-center md:items-start gap-5 text-center md:text-left">
          <div className="text-3xl md:text-5xl font-black md:leading-14">
            {titleArr.map((line, index) => (
              <Fragment key={index}>
                <span className="">{line}</span>
                {index < titleArr.length - 1 && (
                  <>
                    <span>，</span>
                    <br className="hidden md:block" />
                  </>
                )}
              </Fragment>
            ))}
          </div>
          <div className="text-sm md:text-base">{description}</div>
          <Link href={productPage?.href || "/"} className="bg-stone-400 py-2 px-6 text-stone-50 font-black text-xs md:text-base">
            <div>{productPage?.label}</div>
          </Link>
        </div>
        <div className="order-1 md:order-2 col-span-3 h-24"></div>
      </div>
    </>
  );
}
