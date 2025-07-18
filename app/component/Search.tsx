"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  licenseUrl: string;
  medicineCode: string;
};

export default function Search({ inputValue, setInputValue, updateURL }: { inputValue: string; setInputValue: (v: string) => void; updateURL: (customQuery?: string) => void }) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    updateURL();
  };

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`/api/products?q=${encodeURIComponent(inputValue)}`)
        .then((res) => res.json())
        .then((data: Product[]) => setSuggestions(data));
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSelect = (item: Product) => {
    setInputValue(item.name);
    setShowSuggestions(false);
    updateURL(item.name);
  };

  return (
    <div className="relative w-full md:col-span-3">
      <form onSubmit={handleSubmit} action="/products" method="GET" role="search" className="flex flex-1 flex-shrink-0 gap-1.5 border rounded-md py-1.25 md:py-1.5">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <button type="submit" className="cursor-pointer ml-1.75 md:ml-2.25" aria-label="搜尋">
          <Image src="/images/search.svg" alt="" width={24} height={24} className="hidden md:w-fit md:block" />
          <Image src="/images/search_mo.svg" alt="" width={12} height={12} className="w-fit md:hidden" />
        </button>
        <div className="w-full relative flex">
          <div className="absolute h-[85%] w-[1px] bg-theme-6 top-1/2 -translate-y-[50%] left-0"></div>
          <input
            className="block w-[90%] text-xs leading-[1.16] tracking-0 md:text-base md:leading-[1.26] md:tracking-[.5] pl-1 placeholder:text-theme-6 focus:outline-0"
            placeholder="產品名稱或動物藥製字"
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            value={inputValue}
            onFocus={() => inputValue && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-14 z-10 w-full">
          {suggestions.map((item, index) => {
            const keyword = inputValue.toLowerCase();
            const nameIncludes = item.name.toLowerCase().includes(keyword);
            const codeIncludes = item.medicineCode.toLowerCase().includes(keyword);

            const isFirst = index === 0;
            const isLast = index === suggestions.length - 1;

            const displayText = codeIncludes && !nameIncludes ? item.medicineCode : item.name;

            return (
              <li key={item.id} className="flex" onMouseDown={() => handleSelect(item)}>
                <div className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm w-full bg-white border-x border-stone-300 ${isFirst ? "border-t" : ""} ${isLast ? "border-b" : ""}`}>{displayText}</div>
                <div className="w-[44.5px] py-2"></div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
