import { useEffect, useState } from "react";

export default function Filter({ allTypes, allAnimals, setAnimals, setTypes, animals, types }: { allTypes: string[]; allAnimals: string[]; setAnimals: (v: string[]) => void; setTypes: (v: string[]) => void; animals: string[]; types: string[] }) {
    return (
        <section className="col-span-1 flex flex-col">
            <DesktopFilterButton title={"藥品種類"} items={allTypes} item={types} setItems={setTypes} />
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
            {openFilter === "type" && <MobileFilterButton items={allTypes} item={types} setItems={setTypes} setOpenFilter={setOpenFilter} title={"藥品種類"} col={1} />}
            {openFilter === "animal" && <MobileFilterButton items={allAnimals} item={animals} setItems={setAnimals} setOpenFilter={setOpenFilter} title={"適用動物"} col={2} />}
        </>
    );
}

function MobileFilterButton({ items, item, setItems, setOpenFilter, title, col }: { items: string[]; item: string[]; setItems: (v: string[]) => void; setOpenFilter: (v: "type" | "animal" | null) => void; title: string; col: number }) {
    const [tempItems, setTempItems] = useState<string[]>([]);

    useEffect(() => {
        setTempItems(item);
    }, [item]);

    const toggle = (value: string) => {
        setTempItems((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleConfirm = () => {
        setItems(tempItems); // 把暫存值套用
        setOpenFilter(null); // 關閉 filter 視窗
    };


    return (
        <div className="fixed left-0 top-0 z-50 w-full h-screen p-8 flex flex-col items-center justify-start  md:hidden bg-stone-300">
            <div className="absolute right-10 top-10" onClick={() => setOpenFilter(null)}>X</div>
            <div className="mt-32">{title}</div>
            <div className={`grid ${col === 1 ? "grid-cols-1":"grid-cols-2"} gap-y-4 w-full ml-[2px] my-10 px-10`}>
                {items.map((i, idx) => (
                    <button key={idx} type="button" className="col-span-1 flex items-center gap-1 cursor-pointer" onClick={() => toggle(i)}>
                        <div className={`border w-[15px] h-[15px] ${tempItems.includes(i) ? "bg-stone-500 text-white border-stone-500" : "bg-white"}`}></div>
                        <p className="text-md">{i}</p>
                    </button>
                ))}
            </div>
            <button type="button" className="bg-stone-800 text-white py-1 px-10 text-sm" onClick={handleConfirm}>確認</button>
        </div>
    );
}
