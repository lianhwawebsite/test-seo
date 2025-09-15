"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Search from "./Search";
import Table from "./Table";
import Filter from "./Filter";
import NextBreadcrumb from "./NextBreadcrumb";

export default function ProductAllContent({ query, selectedAnimals, selectedTypes, page }: { query: string; selectedAnimals: string[]; selectedTypes: string[]; page: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [productNum, setProductNum] = useState<number>(0);
  const [inputValue, setInputValue] = useState(searchParams.get("query") ?? "");
  const [animals, setAnimals] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  //13種
  const allAnimals = ["家畜", "雞", "豬", "火雞", "牛", "馬", "羊", "犬", "貓", "鵝", "鴨", "魚類", "龜鱉"];
  //7種
  const allTypes = ["注射液、滅菌懸劑", "乾粉注射液、乾粉懸劑", "散劑", "口服液劑", "消毒劑", "補助飼料", "其他"];

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
      <DesktopContent productNum={productNum} inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} allTypes={allTypes} allAnimals={allAnimals} setTypes={setTypes} setAnimals={setAnimals} animals={animals} types={types} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} />
      <MobileContent productNum={productNum} inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} allTypes={allTypes} allAnimals={allAnimals} setTypes={setTypes} setAnimals={setAnimals} animals={animals} types={types} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} />
    </>
  );
}

interface ContentProps {
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
  query: string;
  selectedAnimals: string[];
  selectedTypes: string[];
  page: number;
  setProductNum: (productNum: number) => void;
}

const DesktopContent = ({ productNum, inputValue, setInputValue, updateURL, allTypes, allAnimals, setTypes, setAnimals, animals, types, query, selectedAnimals, selectedTypes, page, setProductNum }: ContentProps) => {
  return (
    <>
      <section className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 mx-auto max-w-[1200px] ">
        <div className="flex flex-col">
          <NextBreadcrumb />
          <div className="text-sm leading-[1.21] tracking-[.3px] mt-1">{productNum}&nbsp;項</div>
        </div>
        <Search inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} />
      </section>
      <section className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-[1200px]">
        <Filter allTypes={allTypes} allAnimals={allAnimals} setAnimals={setAnimals} setTypes={setTypes} animals={animals} types={types} />
        <Table query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} />
      </section>
    </>
  );
};

const MobileContent = ({ productNum, inputValue, setInputValue, updateURL, allTypes, allAnimals, setTypes, setAnimals, animals, types, query, selectedAnimals, selectedTypes, page, setProductNum }: ContentProps) => {
  return (
    <>
      <section className="flex flex-col md:hidden">
        <NextBreadcrumb />
        <div className="text-[12px] leading-[1.2] tracking-0 md:text-sm md:leading-[1.21] md:tracking-[.3px] mt-1">{productNum}&nbsp;項</div>
      </section>
      <section className="grid grid-cols md:hidden md:grid-cols-4 gap-5 mt-5 mb-5">
        <Search inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} />
        <Filter allTypes={allTypes} allAnimals={allAnimals} setAnimals={setAnimals} setTypes={setTypes} animals={animals} types={types} />
      </section>
      <section className="md:hidden mx-auto">
        <Table query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} />
      </section>
    </>
  );
};