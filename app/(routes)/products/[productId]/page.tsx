"use client";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import data from "@/data.json";
import Link from "next/link";
import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import Image from "next/image";

export default function Page() {
  const params = useParams();
  const id = params.productId;
  const product = data.products.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <>
      <section className="mx-auto max-w-[1200px] ">
        <NextBreadcrumb />
      </section>
      <section className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:gap-20 md:mt-10 font-notoSansTC">
        <section className="hidden md:grid grid-cols-2 grid-rows-7 gap-y-6">
          <div className="relative px-6 col-start-2 row-start-1 h-16">
            <div className="absolute top-0 left-0 h-[48px]  border-theme-1 border-3 rounded-4xl"></div>
            <h1 className="font-bold text-2xl leading-[1.22] tracking-[1px]">{product?.name}</h1>
            <h2 className="font-bold text-lg leading-[1.22] tracking-[.6px]">{product?.englishName}</h2>
          </div>
          <p className="px-6 font-medium text-base leading-[1.26] tracking-[.4px] col-start-2 row-start-2">{product?.medicineCode}</p>
        </section>
        <section className="grid grid-cols-1 md:grid-rows-7 gap-y-6">
          <article className="flex flex-col gap-6 justify-between md:hidden">
            <div className="text-primary flex flex-col gap-1.5">
              <h1 className="font-bold text-lg leading-[1.22] tracking-[0.6px]">{product?.name}</h1>
              <h2 className="font-medium text-xs leading-[1.22] tracking-[0px]">{product?.englishName}</h2>
            </div>
            <p className="text-xs leading-[1.16] tracking-[0px]">{product?.medicineCode}</p>
          </article>
          <article className="md:col-start-1 md:row-start-2 md:row-span-6 flex flex-col gap-y-6" itemScope itemType="https://schema.org/Product">
            <div className="text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[0.5px]">
              <p>Each mg contains</p>
              {product?.mainIngredients.map((ingredient, idx) => (
                <div key={idx}>
                  {ingredient.name}.....................................&nbsp;{ingredient.amount}
                </div>
              ))}
            </div>
            <div>
              <p className="font-medium text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.26] md:tracking-[.4px]">用法用量</p>
              <p className="text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[.5px]">{product?.dosageAndAdministration}</p>
            </div>
            <div>
              <p className="font-medium text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.26] md:tracking-[.4px]">適應症</p>
              <p className="text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[.5px]">{product?.indications}</p>
            </div>
            <div>
              <p className="font-medium text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.26] md:tracking-[.4px]">包裝</p>
              <p className="text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[.5px]">{product?.packaging}</p>
            </div>
            <div className="text-primary">
              <p className="font-medium text-xs leading-[1.5] tracking-[0px]  md:text-base md:leading-[1.26] md:tracking-[.4px]">注意事項</p>
              <ol className="list-decimal pl-5">
                {product?.precautions.map((precaution, index) => (
                  <li key={index} className="text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[.5px]">
                    {precaution.precaution}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-center h-20 mb-4">
              {product?.licenseUrl && (
                <Link href={product.licenseUrl} className="relative bg-theme-1 rounded-lg px-10 py-2.5 md:pl-15 md:rounded-xl md:pr-20 md:py-3 cursor-pointer flex">
                  <span className="text-white font-medium text-xs tracking-[0px] md:font-bold md:text-base md:leading-[1.32] md:tracking-[.5px]">動物用藥品許可證查詢</span>
                  <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
                  <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
                </Link>
              )}
            </div>
          </article>
        </section>
      </section>
    </>
  );
}
