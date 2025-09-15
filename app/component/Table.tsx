import data from "@/data.json";
import { Pagination } from "@/app/component/Pagination";
import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/lib/types";

const products: Product[] = (data as any).products.map((p: any) => ({
  ...p,
  animals: Array.isArray(p?.animals) ? (p.animals as string[]) : [],
}));

export default function Table({ query, selectedAnimals, selectedTypes, page, setProductNum }: { query: string; selectedAnimals: string[]; selectedTypes: string[]; page: number; setProductNum: (num: number) => void }) {

  const filteredData = useMemo(() => {
    const q = (query ?? "").toLowerCase();

    return products.filter((item) => {

      const nameHit = item.name.toLowerCase().includes(q);
      const codeHit = (item.medicineCode ?? "").toLowerCase().includes(q);
      const matchQuery = !q || nameHit || codeHit;

      const animalList = item.animals ?? [];
      const matchAnimals = selectedAnimals.length === 0 || selectedAnimals.some((a) => animalList.includes(a));

      const typeStr = item.type ?? "";
      const matchTypes = selectedTypes.length === 0 || selectedTypes.some((t) => typeStr.includes(t));

      return matchQuery && matchAnimals && matchTypes;
    });
  }, [query, selectedAnimals, selectedTypes]);
  
  useEffect(() => {
    setProductNum(filteredData.length);
  }, [filteredData]);

  const pageSize = 12;
  const totalResults = filteredData.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const pagedResults = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="col-span-1 flex flex-col md:col-span-3 gap-9 sm:gap-15">
      <section className="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {pagedResults.map((product) => (
          <Fragment key={product.id}>
            <ProductCard product={product} />
            <ProductCardMobile product={product} />
          </Fragment>
        ))}
      </section>
      {filteredData.length > 0 && <Pagination currentPage={page} totalPages={totalPages} />}
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link className="hidden sm:block" href={`/products/${product.id}`} itemProp="url">
      <article className="" itemScope itemType="https://schema.org/Product">
        <div onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} itemProp="img" className="bg-customGray w-full flex flex-col justify-between px-2 pt-2 pb-1.5 rounded-xl sm:h-45 sm:px-4.5 sm:pt-6 sm:pb-5 hover:bg-theme-1 hover:text-white transition-all">
          <div className="grid grid-cols-2 text-[12px] leading-[1.20] tracking-[0px] h-fit">
            <p itemProp="category">{product.type}</p>
            <p itemProp="productID" className="text-right">
              {product.medicineCode}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 itemProp="name" className="text-xs leading-[1.22] tracking-[.5px] md:text-lg md:leading-[1.26] md:tracking-[.4px] md:truncate md:max-w-[100px] xl:max-w-[150px] font-semibold md:font-medium">
                {product.name}
              </h2>
              <h3 itemProp="english-name" className="text-[10px] leading-[1.20] tracking-0 md:text-sm md:leading-[1.16] md:truncate md:max-w-[100px] xl:max-w-[150px] ">
                {product.englishName}
              </h3>
            </div>
            {isHover ? <Image src="/images/product_arrow_white.svg" alt="" width={57} height={60} className="w-[27px] h-[28px] sm:w-fit sm:h-fit" /> : <Image src="/images/product_arrow.svg" alt="" width={57} height={60} className="w-[27px] h-[28px] sm:w-fit sm:h-fit" />}
          </div>
        </div>

        <meta itemProp="category" content={product.type} />
        {product.animals.map((animal) => (
          <meta key={animal} itemProp="audience" content={animal} />
        ))}
      </article>
    </Link>
  );
}
function ProductCardMobile({ product }: { product: Product }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link className="block sm:hidden" href={`/products/${product.id}`} itemProp="url">
      <article className="" itemScope itemType="https://schema.org/Product">
        <div onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} itemProp="img" className="bg-customGray w-full flex flex-col justify-between gap-11 px-2.5 py-2.5 rounded-lg sm:gap-18 sm:px-4.5 sm:pt-5 sm:pb-3.5 hover:bg-theme-1 hover:text-white transition-all">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <h2 itemProp="name" className="text-base leading-[1.22] tracking-[.5px] md:text-lg md:tracking-[.6px] font-semibold">
                {product.name}
              </h2>
              <h3 itemProp="english-name" className="text-sm leading-[1.20] tracking-0 md:text-base md:leading-[1.16]">
                {product.medicineCode}
              </h3>
            </div>
            {isHover ? <Image src="/images/product_arrow_white.svg" alt="" width={57} height={60} className="w-[27px] h-[28px] sm:w-fit sm:h-fit" /> : <Image src="/images/product_arrow.svg" alt="" width={57} height={60} className="w-[27px] h-[28px] sm:w-fit sm:h-fit" />}
          </div>
        </div>

        <meta itemProp="category" content={product.type} />
        {product.animals.map((animal) => (
          <meta key={animal} itemProp="audience" content={animal} />
        ))}
      </article>
    </Link>
  );
}