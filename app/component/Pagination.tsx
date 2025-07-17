"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageGroupIndex, setPageGroupIndex] = useState(0);
  const pageSize = 6;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const groupIndex = Math.floor((currentPage - 1) / pageSize);
    setPageGroupIndex(groupIndex);
  }, [currentPage, pageSize]);

  const start = pageGroupIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalPages);
  const pagesToShow = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="grid grid-cols-5 w-full">
      <div className="flex gap-2 col-span-1">
        {currentPage > 1 && (
          <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="flex gap-1 items-center">
            <Image src="/images/arrow_left.svg" alt="" width={18} height={18} className="w-[12px] h-[12px] sm:w-fit sm:h-fit" />
            <p className="text-[10px] leading-[1.20] tracking-0 md:text-base md:leading-[1.26] md:tracking-[.5px]">上一頁</p>
          </button>
        )}
      </div>
      <div className="w-full flex justify-center items-center col-span-3">
        {(pagesToShow.length !== 1 || pagesToShow[0] !== 1) &&
          pagesToShow.map((page) => (
            <button key={page} onClick={() => goToPage(page)} className={`text-[10px] leading-[1.20] tracking-0 font-notoSansTC px-2 py-1.5 md:leading-[1.26] md:text-base ${currentPage === page ? "md:tracking-[.4px] " : "md:tracking-[.5px] text-theme-6"}`}>
              {page}
            </button>
          ))}
      </div>
      <div className="flex gap-2 col-span-1 justify-end">
        {currentPage !== totalPages && (
          <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} className="flex gap-1 items-center">
            <p className="text-[10px] leading-[1.20] tracking-0 md:text-base md:leading-[1.26] md:tracking-[.5px]">下一頁</p>
            <Image src="/images/arrow_right.svg" alt="" width={18} height={18} className="w-[12px] h-[12px] sm:w-fit sm:h-fit" />
          </button>
        )}
      </div>
    </div>
  );
}
