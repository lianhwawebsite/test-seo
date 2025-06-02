"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search({ initialQuery = "", initialAnimals = [], initialTypes = [] }: { initialQuery?: string; initialAnimals?: string[]; initialTypes?: string[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputValue, setInputValue] = useState(searchParams.get("query") ?? initialQuery);
  const [animals, setAnimals] = useState<string[]>(initialAnimals);
  const [types, setTypes] = useState<string[]>(initialTypes);
  //13種
  const allAnimals = ["豬", "雞", "火雞", "牛", "馬", "羊", "犬", "貓", "鴨", "鵝", "家畜", "魚/龜鱉目", "其他"];
  //9種
  const allTypes = ["注射液", "滅菌懸劑", "乾粉注射劑","乾粉懸劑", "散劑", "口服液劑", "消毒劑", "輔助飼料", "其他類"];

  const toggle = (value: string, list: string[], setList: (v: string[]) => void) => {
    let newList = [...list];

    newList = newList.includes(value) ? newList.filter((v) => v !== value) : [...newList, value];
    setList(newList);
  };

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

    replace(`${pathname}?${params.toString()}`);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
  };

  useEffect(() => {

    updateURL();
    console.log("animals: ",animals)
    console.log("types: ", types);
  }, [animals, types]);

  return (
    <>
      <form onSubmit={handleSubmit} action="/products" method="GET" role="search" className="flex flex-1 flex-shrink-0 mt-5 mb-10">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input className="block w-full rounded-md border py-[9px] pl-5 text-sm  placeholder:text-gray-500 focus:outline-0" placeholder="搜尋藥品名稱及編號..." onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
        <button type="submit" className="h-[36px] w-[36px] text-2xl text-gray-500" aria-label="搜尋">
          &#8981;
        </button>
      </form>

      <div className="mb-5">
        <h3>適用動物</h3>
        <div className="flex gap-2 flex-wrap">
          {allAnimals.map((a: string, idx) => (
            <button key={idx} type="button" className={`border px-3 py-1 rounded ${animals.includes(a) ? "bg-stone-500 text-white" : "bg-white"}`} onClick={() => toggle(a, animals, setAnimals)}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h3>藥品種類</h3>
        <div className="flex gap-2 flex-wrap">
          {allTypes.map((t, idx) => (
            <button key={idx} type="button" className={`border px-3 py-1 rounded ${types.includes(t) ? "bg-stone-500 text-white" : "bg-white"}`} onClick={() => toggle(t, types, setTypes)}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
