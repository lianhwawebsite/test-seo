import Image from "next/image";
import { useState } from "react";
import { AnimalGroup } from "@/app/lib/types";

export default function Filter({ filterTitles, allTypes, animalGroups, setAnimals, setTypes, animals, types }: { filterTitles: string[]; allTypes: string[]; animalGroups: AnimalGroup[]; setAnimals: (v: string[]) => void; setTypes: (v: string[]) => void; animals: string[]; types: string[] }) {
  return (
    <section className="col-span-1 flex flex-col">
      {/* 產品種類 Filter（原本平面列表，不變） */}
      <DesktopFlatFilter title={filterTitles[0]} items={allTypes} selected={types} setSelected={setTypes} />

      <div className="hidden w-full h-9 md:block" />

      {/* ✅ 適用動物 Filter（改成階層式） */}
      <DesktopGroupFilter title={filterTitles[1]} groups={animalGroups} selected={animals} setSelected={setAnimals} />

      {/* Mobile */}
      <MobileFilterMenu filterTitles={filterTitles} allTypes={allTypes} animalGroups={animalGroups} types={types} animals={animals} setTypes={setTypes} setAnimals={setAnimals} />
    </section>
  );
}

// ────────────────────────────────────────────────
// 產品種類：原本的平面 radio 列表（不改）
// ────────────────────────────────────────────────
function DesktopFlatFilter({ title, items, selected, setSelected }: { title: string; items: string[]; selected: string[]; setSelected: (v: string[]) => void }) {
  const toggle = (value: string) => {
    selected.includes(value) ? setSelected(selected.filter((v) => v !== value)) : setSelected([...selected, value]);
  };

  return (
    <div className="hidden md:block">
      <div className="flex gap-1 items-center">
        <h3 className="text-theme-1 font-bold text-lg leading-[1.22] tracking-[.6px]">{title}</h3>
      </div>
      <div className="mt-5 flex flex-col gap-3.5 w-fit">
        {items.map((i, idx) => (
          <RadioButton key={idx} label={i} checked={selected.includes(i)} onClick={() => toggle(i)} />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// ✅ 適用動物：階層式 Filter（父層 + 子層）
// ────────────────────────────────────────────────
function DesktopGroupFilter({ title, groups, selected, setSelected }: { title: string; groups: AnimalGroup[]; selected: string[]; setSelected: (v: string[]) => void }) {
  // 點父層：全選 or 全取消子層（只存子層，不存父層 label）
  const toggleGroup = (children: string[]) => {
    const allChecked = children.every((c) => selected.includes(c));
    if (allChecked) {
      setSelected(selected.filter((s) => !children.includes(s)));
    } else {
      setSelected(Array.from(new Set([...selected, ...children])));
    }
  };

  // 點子層：只選/取消單項
  const toggleChild = (child: string) => {
    selected.includes(child) ? setSelected(selected.filter((s) => s !== child)) : setSelected([...selected, child]);
  };

  return (
    <div className="hidden md:block">
      <div className="flex gap-1 items-center">
        <h3 className="text-theme-1 font-bold text-lg leading-[1.22] tracking-[.6px]">{title}</h3>
      </div>
      <div className="mt-5 flex flex-col gap-4 w-fit">
        {groups.map((group) => {
          const allChecked = group.children.every((c) => selected.includes(c));
          const someChecked = group.children.some((c) => selected.includes(c));

          return (
            <div key={group.label} className="flex flex-col gap-2.5">
              {/* 父層按鈕 */}
              <RadioButton label={group.label} checked={allChecked} indeterminate={someChecked && !allChecked} onClick={() => toggleGroup(group.children)} />
              {/* 子層按鈕（縮排） */}
              <div className="flex flex-col gap-2.5 pl-5">
                {group.children.map((child) => (
                  <RadioButton key={child} label={child} checked={selected.includes(child)} onClick={() => toggleChild(child)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 共用：單個 Radio 按鈕
// indeterminate = 父層部分選中狀態（⦿ 但非全選）
// ────────────────────────────────────────────────
function RadioButton({ label, checked, indeterminate = false, onClick }: { label: string; checked: boolean; indeterminate?: boolean; onClick: () => void }) {
  return (
    <button type="button" className="flex items-center gap-1.5 cursor-pointer" onClick={onClick}>
      {/* Radio 圖示 */}
      <div className={`relative border rounded-full w-[16px] h-[16px] flex-shrink-0 ${checked || indeterminate ? "border-black border-[1.5px]" : "bg-white border-gray-300"}`}>
        {/* 全選：實心點 */}
        {checked && <div className="absolute bg-theme-1 w-2 h-2 rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" />}
        {/* 部分選中（indeterminate）：較小的點或不同顏色 */}
        {indeterminate && !checked && <div className="absolute bg-theme-1 opacity-40 w-2 h-2 rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" />}
      </div>
      {/* 文字 */}
      <p className={`text-sm leading-[1.26] text-left ${checked || indeterminate ? "font-medium tracking-[.4px] underline" : "font-normal tracking-[.5px]"}`}>{label}</p>
    </button>
  );
}

// ────────────────────────────────────────────────
// Mobile Filter Menu
// ────────────────────────────────────────────────
function MobileFilterMenu({ filterTitles, allTypes, animalGroups, types, animals, setTypes, setAnimals }: { filterTitles: string[]; allTypes: string[]; animalGroups: AnimalGroup[]; types: string[]; animals: string[]; setTypes: (v: string[]) => void; setAnimals: (v: string[]) => void }) {
  const [openFilter, setOpenFilter] = useState<"type" | "animal" | null>(null);

  function FilterTitle({ title, onClick, isActive }: { title: string; onClick: () => void; isActive: boolean }) {
    return (
      <button type="button" onClick={onClick} className="w-fit flex gap-1 items-center justify-center cursor-pointer">
        <h3 className={`text-sm leading-[1.22] tracking-0 text-center ${isActive ? "" : "text-customLightGray"}`}>{title}</h3>
        <Image src="/images/arrow_down.svg" alt="" width={12} height={12} className={`w-fit h-fit ${isActive ? "hidden" : ""}`} />
        <Image src="/images/arrow_up.svg" alt="" width={12} height={12} className={`w-fit h-fit ${isActive ? "" : "hidden"}`} />
      </button>
    );
  }

  return (
    <>
      <div className="flex items-center justify-start gap-4 h-full mr-3 md:hidden">
        <FilterTitle title={filterTitles[0]} isActive={openFilter === "type"} onClick={() => setOpenFilter(openFilter === "type" ? null : "type")} />
        <FilterTitle title={filterTitles[1]} isActive={openFilter === "animal"} onClick={() => setOpenFilter(openFilter === "animal" ? null : "animal")} />
      </div>

      {/* 產品種類：平面列表 */}
      {openFilter === "type" && <MobileFlatFilter items={allTypes} selected={types} setSelected={setTypes} />}

      {/* ✅ 適用動物：階層列表 */}
      {openFilter === "animal" && <MobileGroupFilter groups={animalGroups} selected={animals} setSelected={setAnimals} />}
    </>
  );
}

// Mobile 平面（產品種類）
function MobileFlatFilter({ items, selected, setSelected }: { items: string[]; selected: string[]; setSelected: (v: string[]) => void }) {
  const toggle = (value: string) => {
    selected.includes(value) ? setSelected(selected.filter((s) => s !== value)) : setSelected([...selected, value]);
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 mt-3 md:hidden">
      {items.map((i, idx) => (
        <button key={idx} type="button" className="col-span-1 flex items-center gap-1 cursor-pointer" onClick={() => toggle(i)}>
          <p className={`text-sm leading-[1.21] tracking-[0.3px] ${selected.includes(i) ? "font-medium text-theme-1" : "font-normal"}`}>{i}</p>
        </button>
      ))}
    </div>
  );
}

// ✅ Mobile 階層（適用動物）
function MobileGroupFilter({ groups, selected, setSelected }: { groups: AnimalGroup[]; selected: string[]; setSelected: (v: string[]) => void }) {
  const toggleGroup = (children: string[]) => {
    const allChecked = children.every((c) => selected.includes(c));
    if (allChecked) {
      setSelected(selected.filter((s) => !children.includes(s)));
    } else {
      setSelected(Array.from(new Set([...selected, ...children])));
    }
  };

  const toggleChild = (child: string) => {
    selected.includes(child) ? setSelected(selected.filter((s) => s !== child)) : setSelected([...selected, child]);
  };

  return (
    <div className="flex flex-col gap-4 mt-3 md:hidden">
      {groups.map((group) => {
        const allChecked = group.children.every((c) => selected.includes(c));
        const someChecked = group.children.some((c) => selected.includes(c));

        return (
          <div key={group.label} className="flex flex-col gap-2">
            {/* 父層 */}
            <button type="button" onClick={() => toggleGroup(group.children)} className="flex items-center gap-1 cursor-pointer">
              <p className={`text-sm leading-[1.21] tracking-[0.3px] ${allChecked || someChecked ? "font-medium text-theme-1" : "font-normal"}`}>{group.label}</p>
            </button>
            {/* 子層 */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 pl-4">
              {group.children.map((child) => (
                <button key={child} type="button" onClick={() => toggleChild(child)} className="flex items-center gap-1 cursor-pointer">
                  <p className={`text-sm leading-[1.21] tracking-[0.3px] ${selected.includes(child) ? "font-medium text-theme-1" : "font-normal"}`}>{child}</p>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}