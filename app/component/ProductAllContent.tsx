"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Search from "./Search";
import Table from "./Table";
import Filter from "./Filter";

export default function ProductAllContent({ query, selectedAnimals, selectedTypes, page }: { query: string; selectedAnimals: string[]; selectedTypes: string[]; page: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [productNum, setProductNum] = useState<number>(0);
  const [inputValue, setInputValue] = useState(searchParams.get("query") ?? "");
  const [animals, setAnimals] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  //13種
  const allAnimals = ["豬", "雞", "火雞", "牛", "馬", "羊", "犬", "貓", "鴨", "鵝", "家畜", "魚/龜鱉目", "其他"];
  //9種
  const allTypes = ["注射液", "滅菌懸劑", "乾粉注射劑", "乾粉懸劑", "散劑", "口服液劑", "消毒劑", "輔助飼料", "其他類"];

  function updateURL() {
    const params = new URLSearchParams(searchParams);
    if (inputValue.trim()) {
      params.set("query", inputValue.trim());
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
    updateURL();
  }, [animals, types]);

  return (
    <>
      <section className="flex flex-col">
        <div className="text-base text-stone-700 mt-1">{productNum}&nbsp;項結果</div>
        <Search inputValue={inputValue} setInputValue={setInputValue} updateURL={updateURL} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Filter allTypes={allTypes} allAnimals={allAnimals} setAnimals={setAnimals} setTypes={setTypes} animals={animals} types={types} />

        <Table query={query} selectedAnimals={selectedAnimals} selectedTypes={selectedTypes} page={page} setProductNum={setProductNum} />
      </section>
    </>
  );
}
