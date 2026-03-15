"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Search from "./Search";
import Table from "./Table";
import Filter from "./Filter";
import NextBreadcrumb from "./NextBreadcrumb";
import data from "@/data.json";
import enData from "@/enData.json";
import { AllData } from "@/app/lib/types";

const ProductPageContent = {
  zh: {
    allAnimals: ["家畜", "雞", "豬", "火雞", "牛", "馬", "羊", "犬", "貓", "鵝", "鴨", "魚類", "龜鱉"],
    allTypes: ["注射液、滅菌懸劑", "乾粉注射液、乾粉懸劑", "散劑", "口服液劑", "消毒劑", "補助飼料", "其他"],
    itemsUnit: "項",
    filterTitles: ["產品種類", "適用動物"],
    searchPlaceholder: "產品名稱或動物藥製字",
    paginationLabel: ["上一頁", "下一頁"],
  },
  en: {
    allAnimals: ["Livestock", "Chicken", "Pig", "Turkey", "Cattle", "Horse", "Sheep", "Dog", "Cat", "Goose", "Duck", "Fish", "Turtle"],
    allTypes: ["Injection", "Dry Powder", "Powder", "Oral Solution", "Disinfectant", "Supplement", "Others"],
    itemsUnit: "items",
    filterTitles: ["Product Type", "Target Species"],
    searchPlaceholder: "Product Name or No.",
    paginationLabel: ["Previous", "Next"],
  },
};

export default function ProductAllContent({ query, selectedAnimals, selectedTypes, page }: { query: string; selectedAnimals: string[]; selectedTypes: string[]; page: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isEn = pathname.startsWith("/en");
  const currentData = isEn ? enData : data;
  const PageContent = isEn ? ProductPageContent.en : ProductPageContent.zh;
  const SearchLang = isEn ? "en" : "";
  const TableProductURL = isEn ? "/en/" : "/";

  const [productNum, setProductNum] = useState<number>(0);
  const [inputValue, setInputValue] = useState(searchParams.get("query") ?? "");
  const [animals, setAnimals] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const allAnimals = PageContent.allAnimals;
  const allTypes = PageContent.allTypes;

  function updateURL(customQuery?: string) {
    const params = new URLSearchParams(searchParams);
    const effectiveQuery = customQuery?.trim() ?? inputValue.trim();

    if (effectiveQuery) {
      params.set("query", effectiveQuery);
    } else {
      params.delete("query");
    }

    if (animals.length > 0) {
      params.set("animals", animals.join(","));
    } else {
      params.delete("animals");
    }

    if (types.length > 0) {
      params.set("types", types.join(","));
    } else {
      params.delete("types");
    }

    params.delete("page");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // 1. 初始化（只有第一次 render）
  useEffect(() => {
    const initAnimals = searchParams.get("animals")?.split(",") ?? [];
    const initTypes = searchParams.get("types")?.split(",") ?? [];
    setAnimals(initAnimals);
    setTypes(initTypes);
  }, []);

  // 2. 同步 URL ← state
  useEffect(() => {
    updateURL();
  }, [animals, types]);

  // 3. 同步 state ← URL（修正從 breadcrumbs 點回來的狀況）
  useEffect(() => {
    const urlTypes = searchParams.get("types")?.split(",") ?? [];
    const urlAnimals = searchParams.get("animals")?.split(",") ?? [];

    if (JSON.stringify(urlTypes) !== JSON.stringify(types) || JSON.stringify(urlAnimals) !== JSON.stringify(animals)) {
      setTypes(urlTypes);
      setAnimals(urlAnimals);
    }
  }, [searchParams.toString()]);

  return (
    <>
      <DesktopContent TableProductURL={TableProductURL} SearchLang={SearchLang} itemsUnit={PageContent.itemsUnit} searchPlaceholder={PageContent.searchPlaceholder} filterTitles={PageContent.filterTitles} productNum={productNum} inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} allTypes={allTypes} allAnimals={allAnimals} setTypes={setTypes} setAnimals={setAnimals} animals={animals} types={types} allTabledata={currentData} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} PaginationLabel={PageContent.paginationLabel} />
      <MobileContent TableProductURL={TableProductURL} SearchLang={SearchLang} itemsUnit={PageContent.itemsUnit} searchPlaceholder={PageContent.searchPlaceholder} filterTitles={PageContent.filterTitles} productNum={productNum} inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} allTypes={allTypes} allAnimals={allAnimals} setTypes={setTypes} setAnimals={setAnimals} animals={animals} types={types} allTabledata={currentData} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} PaginationLabel={PageContent.paginationLabel} />
    </>
  );
}

interface ContentProps {
  TableProductURL: string;
  SearchLang: string;
  itemsUnit: string;
  searchPlaceholder: string;
  filterTitles: string[];
  productNum: number;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  updateURL: (customQuery?: string) => void;
  allTypes: string[];
  allAnimals: string[];
  setTypes: (types: string[]) => void;
  setAnimals: (animals: string[]) => void;
  animals: string[];
  types: string[];
  allTabledata: AllData;
  query: string;
  selectedAnimals: string[];
  selectedTypes: string[];
  page: number;
  setProductNum: (productNum: number) => void;
  PaginationLabel: string[];
}

const DesktopContent = ({ TableProductURL, SearchLang, itemsUnit, searchPlaceholder, filterTitles, productNum, inputValue, setInputValue, updateURL, allTypes, allAnimals, setTypes, setAnimals, animals, types, allTabledata, query, selectedAnimals, selectedTypes, page, setProductNum, PaginationLabel }: ContentProps) => {
  return (
    <>
      <section className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 mx-auto max-w-[1200px] ">
        <div className="flex flex-col">
          <NextBreadcrumb />
          <div className="text-sm leading-[1.21] tracking-[.3px] mt-1">
            {productNum}&nbsp;{itemsUnit}
          </div>
        </div>
        <Search lang={SearchLang} placeholder={searchPlaceholder} inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} />
      </section>
      <section className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-[1200px]">
        <Filter filterTitles={filterTitles} allTypes={allTypes} allAnimals={allAnimals} setAnimals={setAnimals} setTypes={setTypes} animals={animals} types={types} />
        <Table TableProductURL={TableProductURL} data={allTabledata} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} PaginationLabel={PaginationLabel} />
      </section>
    </>
  );
};

const MobileContent = ({ TableProductURL, SearchLang, itemsUnit, searchPlaceholder, filterTitles, productNum, inputValue, setInputValue, updateURL, allTypes, allAnimals, setTypes, setAnimals, animals, types, allTabledata, query, selectedAnimals, selectedTypes, page, setProductNum, PaginationLabel }: ContentProps) => {
  return (
    <>
      <section className="flex flex-col md:hidden">
        <NextBreadcrumb />
        <div className="text-[12px] leading-[1.2] tracking-0 md:text-sm md:leading-[1.21] md:tracking-[.3px] mt-1">
          {productNum}&nbsp;{itemsUnit}
        </div>
      </section>
      <section className="grid grid-cols md:hidden md:grid-cols-4 gap-5 mt-5 mb-5">
        <Search lang={SearchLang} placeholder={searchPlaceholder} inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} />
        <Filter filterTitles={filterTitles} allTypes={allTypes} allAnimals={allAnimals} setAnimals={setAnimals} setTypes={setTypes} animals={animals} types={types} />
      </section>
      <section className="md:hidden mx-auto">
        <Table TableProductURL={TableProductURL} data={allTabledata} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} PaginationLabel={PaginationLabel} />
      </section>
    </>
  );
};
