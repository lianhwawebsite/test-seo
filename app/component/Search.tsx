"use client";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  licenseUrl: string;
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
    <div className="relative">
      <form onSubmit={handleSubmit} action="/products" method="GET" role="search" className="flex flex-1 flex-shrink-0 gap-2 mt-5 mb-8">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="block w-full border border-stone-300 py-[9px] pl-5 text-sm placeholder:text-stone-400 focus:outline-0"
          placeholder="搜尋藥品名稱及編號..."
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          value={inputValue}
          onFocus={() => inputValue && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        <button type="submit" className="h-[36px] w-[36px] text-2xl text-gray-500 -rotate-[1.25rad]" aria-label="搜尋">
          &#8981;
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-stone-300 rounded shadow">
          {suggestions.map((item) => (
            <li key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm" onMouseDown={() => handleSelect(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
