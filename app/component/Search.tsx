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
  const [inputFocus, setInputFocus] = useState(false);

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

  const handleDelete = () => {
    setInputValue("");
    setShowSuggestions(false);
    updateURL("");
    setInputFocus(true);
  };

  return (
    <div className="relative w-full md:col-span-3">
      <form onSubmit={handleSubmit} action="/products" method="GET" role="search" className={`relative flex flex-1 flex-shrink-0 gap-1.5 outline rounded-md py-1.25 md:py-1.5 ${inputFocus ? "outline-theme-1 outline-2" : "outline-black"}`}>
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
            onFocus={(e) => {
              e.target.placeholder = "";
              inputValue && setShowSuggestions(true);
              setInputFocus(true);
            }}
            onBlur={(e) => {
              e.target.placeholder = "產品名稱或動物藥製字";
              setTimeout(() => {
                setShowSuggestions(false);
                setInputFocus(false);
              }, 150);
            }}
          />
        </div>
        <button type="button" className={`absolute top-[50%] right-1 md:right-[8px] -translate-y-[50%] cursor-pointer ${inputFocus ? "block" : "hidden"}`} onClick={handleDelete} aria-label="清除搜尋">
          <Image src="/images/close_black.svg" alt="" width={24} height={24} className="w-[15px] h-[15px] md:w-fit md:h-fit" />
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-6 left-6 z-10 w-full md:top-8 md:left-10">
          {suggestions.map((item, index) => {
            const keyword = inputValue.toLowerCase();
            const nameIncludes = item.name.toLowerCase().includes(keyword);
            const codeIncludes = item.medicineCode.toLowerCase().includes(keyword);

            const isFirst = index === 0;
            const isLast = index === suggestions.length - 1;

            const displayText = codeIncludes && !nameIncludes ? item.medicineCode : item.name;

            return (
              <li key={item.id} className="flex" onMouseDown={() => handleSelect(item)}>
                <div className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs w-full bg-white border-x md:text-base ${isFirst ? "border-t" : ""} ${isLast ? "border-b" : ""}`}>{displayText}</div>
                <div className="w-[44.5px] py-2"></div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
