import Image from "next/image";
import { useEffect, useState } from "react";

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
            <div className={`border rounded-full w-[20px] h-[20px] ${item.includes(i) ? "bg-theme-1 text-white border-black" : "bg-white"}`}></div>
            <p className="text-base leading-[1.26] tracking-[.5px]">{i}</p>
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
        <h3 className="text-xs leading-[1.22] tracking-0 text-center">{title}</h3>
        <Image src="/images/arrow_down.svg" alt="" width={12} height={12} className={`w-fit h-fit ${isActive ? "hidden" : ""}`} />
      </button>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between h-full mr-3 md:hidden">
        <FilterTitle title={"產品種類"} isActive={openFilter === "type"} onClick={() => setOpenFilter(openFilter === "type" ? null : "type")} />
        <FilterTitle title={"適用動物"} isActive={openFilter === "animal"} onClick={() => setOpenFilter(openFilter === "animal" ? null : "animal")} />
      </div>
      {openFilter === "type" && <MobileFilterButton items={allTypes} item={types} setItems={setTypes} setOpenFilter={setOpenFilter} title={"產品種類"} col={1} />}
      {openFilter === "animal" && <MobileFilterButton items={allAnimals} item={animals} setItems={setAnimals} setOpenFilter={setOpenFilter} title={"適用動物"} col={1} />}
    </>
  );
}

function MobileFilterButton({ items, item, setItems, setOpenFilter, title, col }: { items: string[]; item: string[]; setItems: (v: string[]) => void; setOpenFilter: (v: "type" | "animal" | null) => void; title: string; col: number }) {
  const [tempItems, setTempItems] = useState<string[]>([]);

  useEffect(() => {
    setTempItems(item);
  }, [item]);

  const toggle = (value: string) => {
    setTempItems((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleConfirm = () => {
    setItems(tempItems); // 把暫存值套用
    setOpenFilter(null); // 關閉 filter 視窗
  };

  return (
    <div className="fixed right-0 top-0 z-50 w-[94%] h-screen flex items-start justify-end text-white md:hidden">
      <div className="z-50 w-[76%] flex flex-col items-center justify-start relative pr-6">
        <div className="absolute z-50 right-8.75 top-21" onClick={() => setOpenFilter(null)}>
          <Image src="/images/close.svg" alt="" width={16} height={16} className="w-fit h-fit" />
        </div>
        <div className="z-50 mt-32 flex items-center justify-between border border-white rounded-sm px-3 py-2.25 w-full">
          <p className="text-sm leading-[1.21] tracking-[0.3px]">{title}</p>
          <Image src="/images/arrow_down_white.svg" alt="" width={16} height={16} className="w-fit h-fit" />
        </div>
        <div className={`z-50 grid ${col === 1 ? "grid-cols-1" : "grid-cols-2"} gap-y-3.5 w-full ml-[2px] my-7.5 pl-3`}>
          {items.map((i, idx) => (
            <button key={idx} type="button" className="col-span-1 flex items-center gap-1 cursor-pointer" onClick={() => toggle(i)}>
              <div className={`border rounded-full border-white w-[18px] h-[18px] ${tempItems.includes(i) ? "bg-theme-1" : "bg-transparent"}`}></div>
              <p className="text-sm leading-[1.21] tracking-[0.3px]">{i}</p>
            </button>
          ))}
        </div>
        <button type="button" className="relative z-50 bg-theme-1 rounded-lg text-white px-11.75 py-2.75 text-xs leading-[1.22] tracking-0" onClick={handleConfirm}>
          <p>顯示篩選結果</p>
          <Image src="/images/arrow_right_white.svg" alt="" width={17} height={17} className="w-fit h-fit absolute top-[50%] -translate-y-[50%] right-[2px]" />
        </button>
      </div>

      <div className="absolute top-0 z-40 h-screen w-full bg-customDarkGray opacity-[.9]"></div>
    </div>
  );
}
