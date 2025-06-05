"use client";

export default function Search({ inputValue, setInputValue, updateURL }: { inputValue: string; setInputValue: (v: string) => void; updateURL: () => void }) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="/products" method="GET" role="search" className="flex flex-1 flex-shrink-0 gap-2 mt-5 mb-8">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input className="block w-full border border-stone-300 py-[9px] pl-5 text-sm  placeholder:text-stone-400 focus:outline-0" placeholder="搜尋藥品名稱及編號..." onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
        <button type="submit" className="h-[36px] w-[36px] text-2xl text-gray-500 -rotate-[1.25rad]" aria-label="搜尋">
          &#8981;
        </button>
      </form>
    </>
  );
}
