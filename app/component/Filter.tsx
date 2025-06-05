import { useState } from "react";

export default function Filter({ allTypes, allAnimals, setAnimals, setTypes, animals, types }: { allTypes: string[]; allAnimals: string[]; setAnimals: (v: string[]) => void; setTypes: (v: string[]) => void; animals: string[]; types: string[] }) {
  return (
    <section className="col-span-1 flex flex-col">
      <h2 className="hidden text-xl font-semibold mb-4 md:block">Filter</h2>
      <DesktopFilterButton title={"藥品種類"} items={allTypes} item={types} setItems={setTypes} />
      <div className="hidden border-0 border-b w-full h-1 mt-5 mb-6 md:block" />
      <DesktopFilterButton title={"適用動物"} items={allAnimals} item={animals} setItems={setAnimals} />
      <MobileFilterMenu allTypes={allTypes} allAnimals={allAnimals} types={types} animals={animals} setTypes={setTypes} setAnimals={setAnimals} />
    </section>
  );
}

function DesktopFilterButton({ title, items, item, setItems }: { title: string; items: string[]; item: string[]; setItems: (v: string[]) => void }) {
  const toggle = (value: string, list: string[], setList: (v: string[]) => void) => {
    let newList = [...list];

    newList = newList.includes(value) ? newList.filter((v) => v !== value) : [...newList, value];
    setList(newList);
  };

  return (
    <div className="hidden md:block">
      <div className="flex gap-1 items-center">
        <div className="bg-stone-300 rounded-full w-5 h-5"></div>
        <h3 className="text-stone-900 font-bold">{title}</h3>
      </div>
      <div className="mt-4 flex flex-col gap-2 w-fit ml-[2px]">
        {items.map((i, idx) => (
          <button key={idx} type="button" className="flex items-center gap-2 cursor-pointer" onClick={() => toggle(i, item, setItems)}>
            <div className={`border w-[15px] h-[15px] ${item.includes(i) ? "bg-stone-500 text-white border-stone-500" : "bg-white"}`}></div>
            <p className="text-md">{i}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileFilterMenu({ allTypes, allAnimals, types, animals, setTypes, setAnimals }: { allTypes: string[]; allAnimals: string[]; types: string[]; animals: string[]; setTypes: (v: string[]) => void; setAnimals: (v: string[]) => void }) {
 const [openFilter, setOpenFilter] = useState<"type" | "animal" | null>(null);

  function FilterTitle({ title, onClick, isActive }: { title: string; onClick: () => void; isActive: boolean }) {
    return (
      <button type="button" onClick={onClick} className="w-full flex gap-1 items-center justify-center py-4 cursor-pointer">
        <h3 className="text-stone-900 font-bold text-center">{title}</h3>
        <div className={`rounded-full w-4 h-4 ${isActive ? "bg-stone-500" : "bg-stone-300"}`} />
      </button>
    );
  }


  return (
    <>
      <div className="flex justify-between border-y md:hidden">
        <FilterTitle title={"藥品種類"} isActive={openFilter === "type"} onClick={() => setOpenFilter(openFilter === "type" ? null : "type")} />
        <div className="border-0 border-l w-1 h-full" />
        <FilterTitle title={"適用動物"} isActive={openFilter === "animal"} onClick={() => setOpenFilter(openFilter === "animal" ? null : "animal")} />
      </div>
      {openFilter === "type" && <MobileFilterButton items={allTypes} item={types} setItems={setTypes} />}
      {openFilter === "animal" && <MobileFilterButton items={allAnimals} item={animals} setItems={setAnimals} />}
    </>
  );
}

function MobileFilterButton({ items, item, setItems }: { items: string[]; item: string[]; setItems: (v: string[]) => void }) {
  const toggle = (value: string, list: string[], setList: (v: string[]) => void) => {
    let newList = [...list];

    newList = newList.includes(value) ? newList.filter((v) => v !== value) : [...newList, value];
    setList(newList);
  };

  return (
    <div className="flex flex-col justify-between md:hidden">
      <div className="grid grid-cols-3 gap-y-4 w-full ml-[2px] my-5">
        {items.map((i, idx) => (
          <button key={idx} type="button" className="col-span-1 flex items-center gap-1 cursor-pointer" onClick={() => toggle(i, item, setItems)}>
            <div className={`border w-[15px] h-[15px] ${item.includes(i) ? "bg-stone-500 text-white border-stone-500" : "bg-white"}`}></div>
            <p className="text-md">{i}</p>
          </button>
        ))}
      </div>
      <div className="border-0 border-b w-full h-1" />
    </div>
  );
}
