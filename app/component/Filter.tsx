import Image from "next/image";
import { useEffect, useState } from "react";
import { CTAFunc } from "./CTA";

export default function Filter({ allTypes, allAnimals, setAnimals, setTypes, animals, types }: { allTypes: string[]; allAnimals: string[]; setAnimals: (v: string[]) => void; setTypes: (v: string[]) => void; animals: string[]; types: string[] }) {
  return (
    <section className="col-span-1 flex flex-col">
      <DesktopFilterButton title={"產品種類"} items={allTypes} item={types} setItems={setTypes} />
      <div className="hidden w-full h-13.5 md:block" />
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
        <h3 className="text-theme-1 font-bold text-lg leading-[1.22] tracking-[.6px]">{title}</h3>
      </div>
      <div className="mt-5 flex flex-col gap-3.5 w-fit">
        {items.map((i, idx) => (
          <button key={idx} type="button" className="flex items-center gap-1.5 cursor-pointer" onClick={() => toggle(i, item, setItems)}>
            <div className={`relative border rounded-full w-[20px] h-[20px] ${item.includes(i) ? " border-black border-[1.5px]" : "bg-white"}`}>{item.includes(i) && <div className="absolute bg-theme-1 w-2 h-2 rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>}</div>

            <p className={`text-base leading-[1.26] text-left  ${item.includes(i) ? "font-medium tracking-[.4px] underline" : "font-normal tracking-[.5px]"}`}>{i}</p>
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
      <button type="button" onClick={onClick} className="w-fit flex gap-1 items-center justify-center cursor-pointer">
        <h3 className={`text-xs leading-[1.22] tracking-0 text-center   ${isActive ? "" : "text-customLightGray"}`}>{title}</h3>
        <Image src="/images/arrow_down.svg" alt="" width={12} height={12} className={`w-fit h-fit ${isActive ? "hidden" : ""}`} />
        <Image src="/images/arrow_up.svg" alt="" width={12} height={12} className={`w-fit h-fit ${isActive ? "" : "hidden"}`} />
      </button>
    );
  }

  return (
    <>
      <div className="flex items-center justify-start gap-4 h-full mr-3 md:hidden">
        <FilterTitle title={"產品種類"} isActive={openFilter === "type"} onClick={() => setOpenFilter(openFilter === "type" ? null : "type")} />
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
    <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 mt-3 md:hidden">
      {items.map((i, idx) => (
        <button key={idx} type="button" className="col-span-1 flex items-center gap-1 cursor-pointer" onClick={() => toggle(i, item, setItems)}>
          <p className={`text-sm leading-[1.21] tracking-[0.3px] ${item.includes(i) ? "font-medium text-theme-1" : "font-normal"}`}>{i}</p>
        </button>
      ))}
    </div>
  );
}