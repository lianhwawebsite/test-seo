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
      <form onSubmit={handleSubmit} action="/products" method="GET" role="search" className="flex flex-1 flex-shrink-0 gap-2 border rounded-md">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <button type="submit" className="cursor-pointer ml-2.5" aria-label="搜尋">
          <Image src="/images/search.svg" alt="" width={24} height={24} className="w-3/4" />
        </button>
        <input
          className="block w-full py-[9px] pl-5 text-sm placeholder:text-stone-400 focus:outline-0"
          placeholder="產品名稱或動物藥製字"
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          value={inputValue}
          onFocus={() => inputValue && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
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
