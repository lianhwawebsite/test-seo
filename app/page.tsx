import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import data from "@/data.json";
import { Fragment } from "react";

export function generateMetadata() {
  return getMetadata("zh-TW", "home");
}

export default function Home() {
  const schema = getSchema("home");
  const { title, description } = data.home;
  const titleArr = title.split("，");
  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <div className="bg-stone-200 w-full h-96 md:h-[672px] grid md:grid-cols-7 md:p-10">
        <div className="md:col-span-4 flex flex-col justify-center items-start px-8 gap-4">
          <div className="text-3xl md:text-5xl font-black md:leading-14">
            {titleArr.map((line, index) => (
              <Fragment key={index}>
                <span className="">{line}</span>
                {index < titleArr.length - 1 && (
                  <>
                    <span>，</span>
                    <br />
                  </>
                )}
              </Fragment>
            ))}
          </div>
          <div className="text-sm md:text-base">{description}</div>
        </div>
        <div className="hidden md:block col-span-3"></div>
      </div>
    </>
  );
}
