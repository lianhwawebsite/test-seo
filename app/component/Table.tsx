import { Pagination } from "@/app/component/Pagination";
import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AllData, Product, AnimalGroup } from "@/app/lib/types";

export default function Table({
  TableProductURL,
  data,
  query,
  selectedAnimals,
  selectedTypes,
  page,
  setProductNum,
  PaginationLabel,
  animalGroups, // ✅ 新增 prop
}: {
  TableProductURL: string;
  data: AllData;
  query: string;
  selectedAnimals: string[];
  selectedTypes: string[];
  page: number;
  setProductNum: (num: number) => void;
  PaginationLabel: string[];
  animalGroups: AnimalGroup[]; // ✅ 新增型別
}) {
  const products: Product[] = (data as AllData).products.map((p: any) => ({
    ...p,
    animals: Array.isArray(p?.animals) ? (p.animals as string[]) : [],
  }));

  // ✅ 把 animalGroups 轉成 Map，方便快速查找：{ "家畜" -> ["豬","牛","馬","羊"], ... }
  const groupChildrenMap = useMemo(() => {
    const map = new Map<string, string[]>();
    animalGroups.forEach((g) => map.set(g.label, g.children));
    return map;
  }, [animalGroups]);

  const filteredData = useMemo(() => {
    const q = (query ?? "").toLowerCase();

    return products.filter((item) => {
      const nameHit = item.name.toLowerCase().includes(q);
      const codeHit = (item.medicineCode ?? "").toLowerCase().includes(q);
      const matchQuery = !q || nameHit || codeHit;

      // ✅ 過濾動物邏輯：
      // 遍歷產品的每個 animals 值，判斷是否命中 selectedAnimals
      // 若 animals 值是父層名稱（如 "家畜"），展開成子層再比對
      const matchAnimals =
        selectedAnimals.length === 0 ||
        item.animals.some((animalValue) => {
          const children = groupChildrenMap.get(animalValue);
          if (children) {
            // 這個值是父層（如 "家畜"）→ 展開子層，看子層有沒有被勾選
            return children.some((c) => selectedAnimals.includes(c));
          } else {
            // 這個值是子層（如 "鴨"）→ 直接比對
            return selectedAnimals.includes(animalValue);
          }
        });

      const typeStr = item.type ?? "";
      const matchTypes = selectedTypes.length === 0 || selectedTypes.some((t) => typeStr.includes(t));

      return matchQuery && matchAnimals && matchTypes;
    });
  }, [query, selectedAnimals, selectedTypes, groupChildrenMap]);

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
            <ProductCard TableProductURL={TableProductURL} product={product} />
            <ProductCardMobile TableProductURL={TableProductURL} product={product} />
          </Fragment>
        ))}
      </section>
      {filteredData.length > 0 && <Pagination PaginationLabel={PaginationLabel} currentPage={page} totalPages={totalPages} />}
    </section>
  );
}

function ProductCard({ TableProductURL, product }: { TableProductURL: string; product: Product }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link className="hidden sm:block" href={`${TableProductURL}products/${product.id}`} itemProp="url">
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
              {TableProductURL === "/" ? (
                <h3 itemProp="alternative-name" className="text-[10px] leading-[1.20] tracking-0 md:text-sm md:leading-[1.16] md:truncate md:max-w-[100px] xl:max-w-[150px]">
                  {product.alternativeName}
                </h3>
              ) : null}
            </div>
            {isHover ? <Image src="/images/product_arrow_white_PC.svg" alt="" width={57} height={60} className="w-[47.5px] h-[50px] sm:w-fit sm:h-fit" /> : <Image src="/images/product_arrow_PC.svg" alt="" width={57} height={60} className="w-[47.5px] h-[50px] sm:w-fit sm:h-fit" />}
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

function ProductCardMobile({ TableProductURL, product }: { TableProductURL: string; product: Product }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link className="block sm:hidden" href={`${TableProductURL}products/${product.id}`} itemProp="url">
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
            {isHover ? <Image src="/images/product_arrow_white_MO.svg" alt="" width={57} height={60} className="w-[28px] h-[28px] sm:w-fit sm:h-fit" /> : <Image src="/images/product_arrow_MO.svg" alt="" width={57} height={60} className="w-[28px] h-[28px] sm:w-fit sm:h-fit" />}
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
