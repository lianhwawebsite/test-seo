"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
const [inputValue, setInputValue] = useState(searchParams.get("query") ?? "");

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
     e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (inputValue.trim()) {
      params.set("query", inputValue.trim());
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} action="/products" method="GET" role="search" className="flex flex-1 flex-shrink-0 mt-5 mb-10">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input className="block w-full rounded-md border py-[9px] pl-5 text-sm  placeholder:text-gray-500 focus:outline-0" placeholder={placeholder} onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      <button type="submit" className="h-[36px] w-[36px] text-2xl text-gray-500" aria-label="搜尋">
        &#8981;
      </button>
    </form>
  );
}
