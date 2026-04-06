"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Search from "./Search";
import Table from "./Table";
import Filter from "./Filter";
import NextBreadcrumb from "./NextBreadcrumb";
import data from "@/data.json";
import enData from "@/enData.json";
import { AllData, AnimalGroup } from "@/app/lib/types";


const ProductPageContent = {
  zh: {
    // ✅ 改成階層結構
    animalGroups: [
      { label: "家畜", children: ["豬", "牛", "馬", "羊"] },
      { label: "家禽", children: ["雞", "火雞", "鵝", "鴨"] },
      { label: "其他", children: ["犬", "貓", "魚類", "龜鱉"] },
    ] as AnimalGroup[],
    allTypes: ["注射液、滅菌懸劑", "乾粉注射液、乾粉懸劑", "散劑", "口服液劑", "消毒劑", "補助飼料", "其他"],
    itemsUnit: "項",
    filterTitles: ["產品種類", "適用動物"],
    searchPlaceholder: "產品名稱或動物藥製字",
    paginationLabel: ["上一頁", "下一頁"],
  },
  en: {
    animalGroups: [
      { label: "Livestock", children: ["Swine", "Cattle", "Horse", "Sheep & Goat"] },
      { label: "Poultry", children: ["Chicken", "Turkey", "Goose", "Duck"] },
      { label: "Others", children: ["Dog", "Cat", "Aquatic", "Reptile"] },
    ] as AnimalGroup[],
    allTypes: ["Injectable & Sterile Suspensions", "Dry Powder Injections & Suspensions", "Soluble Powders", "Oral Liquids", "Disinfectants (External Use)", "Feed Supplements", "Others"],
    itemsUnit: "item(s)",
    filterTitles: ["Categories", "Target Species"],
    searchPlaceholder: "Search by Product Name or Registration No.",
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

  // ✅ 傳 animalGroups 而非 allAnimals
  const animalGroups = PageContent.animalGroups;
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

  useEffect(() => {
    const initAnimals = searchParams.get("animals")?.split(",") ?? [];
    const initTypes = searchParams.get("types")?.split(",") ?? [];
    setAnimals(initAnimals);
    setTypes(initTypes);
  }, []);

  useEffect(() => {
    updateURL();
  }, [animals, types]);

  useEffect(() => {
    const urlTypes = searchParams.get("types")?.split(",") ?? [];
    const urlAnimals = searchParams.get("animals")?.split(",") ?? [];
    if (JSON.stringify(urlTypes) !== JSON.stringify(types) || JSON.stringify(urlAnimals) !== JSON.stringify(animals)) {
      setTypes(urlTypes);
      setAnimals(urlAnimals);
    }
  }, [searchParams.toString()]);

  const sharedProps = {
    TableProductURL,
    SearchLang,
    itemsUnit: PageContent.itemsUnit,
    searchPlaceholder: PageContent.searchPlaceholder,
    filterTitles: PageContent.filterTitles,
    productNum,
    inputValue,
    setInputValue,
    updateURL,
    allTypes,
    animalGroups, // ✅ 改成 animalGroups
    setTypes,
    setAnimals,
    animals,
    types,
    allTabledata: currentData,
    query,
    selectedAnimals,
    selectedTypes,
    page,
    setProductNum,
    PaginationLabel: PageContent.paginationLabel,
  };

  return (
    <>
      <DesktopContent {...sharedProps} />
      <MobileContent {...sharedProps} />
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
  animalGroups: AnimalGroup[]; // ✅ 改成 animalGroups
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

const DesktopContent = ({ TableProductURL, SearchLang, itemsUnit, searchPlaceholder, filterTitles, productNum, inputValue, setInputValue, updateURL, allTypes, animalGroups, setTypes, setAnimals, animals, types, allTabledata, query, selectedAnimals, selectedTypes, page, setProductNum, PaginationLabel }: ContentProps) => {
  return (
    <>
      <section className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 mx-auto max-w-[1200px]">
        <div className="flex flex-col">
          <NextBreadcrumb />
          <div className="text-sm leading-[1.21] tracking-[.3px] mt-1">
            {productNum}&nbsp;{itemsUnit}
          </div>
        </div>
        <Search lang={SearchLang} placeholder={searchPlaceholder} inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} />
      </section>
      <section className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-[1200px]">
        <Filter
          filterTitles={filterTitles}
          allTypes={allTypes}
          animalGroups={animalGroups} // ✅
          setAnimals={setAnimals}
          setTypes={setTypes}
          animals={animals}
          types={types}
        />
        <Table TableProductURL={TableProductURL} data={allTabledata} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} PaginationLabel={PaginationLabel} animalGroups={animalGroups} />
      </section>
    </>
  );
};

const MobileContent = ({ TableProductURL, SearchLang, itemsUnit, searchPlaceholder, filterTitles, productNum, inputValue, setInputValue, updateURL, allTypes, animalGroups, setTypes, setAnimals, animals, types, allTabledata, query, selectedAnimals, selectedTypes, page, setProductNum, PaginationLabel }: ContentProps) => {
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
        <Filter
          filterTitles={filterTitles}
          allTypes={allTypes}
          animalGroups={animalGroups} // ✅
          setAnimals={setAnimals}
          setTypes={setTypes}
          animals={animals}
          types={types}
        />
      </section>
      <section className="md:hidden mx-auto">
        <Table TableProductURL={TableProductURL} data={allTabledata} query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} PaginationLabel={PaginationLabel} animalGroups={animalGroups} />
      </section>
    </>
  );
};
