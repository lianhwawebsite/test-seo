"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-center gap-2 mt-8 mb-16">
      <PaginationGroup totalPages={totalPages} currentPage={currentPage} goToPage={goToPage} />
    </div>
  );
}

interface Props {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  pageSize?: number;
  className?: string;
}

export default function PaginationGroup({ totalPages, currentPage, goToPage, pageSize = 5, className = "" }: Props) {
  const totalGroups = Math.ceil(totalPages / pageSize);
  const [pageGroupIndex, setPageGroupIndex] = useState(0);

  useEffect(() => {
    const groupIndex = Math.floor((currentPage - 1) / pageSize);
    setPageGroupIndex(groupIndex);
  }, [currentPage, pageSize]);

  const start = pageGroupIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalPages);
  const pagesToShow = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const goToNextGroup = () => {
    if (pageGroupIndex < totalGroups - 1) {
      setPageGroupIndex((prev) => prev + 1);
    }
  };

  const goToPrevGroup = () => {
    if (pageGroupIndex > 0) {
      setPageGroupIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={`flex ${className}`}>
      <div className="w-24 flex gap-2 justify-end">
        {/* {pageGroupIndex > 0 && (
          <button onClick={goToPrevGroup} className="font-extrabold w-6 text-stone-200">
            &#706;&#706;
          </button>
        )} */}
        {currentPage > 1 && (
          <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="w-10 text-2xl font-bold">
            &#8592;
          </button>
        )}
      </div>
      <div className="w-fit flex justify-center">
        {(pagesToShow.length !== 1 || pagesToShow[0] !== 1) &&
          pagesToShow.map((page) => (
            <button key={page} onClick={() => goToPage(page)} className={`px-3 py-1 border ${currentPage === page ? " " : "text-stone-200 border-stone-200"}`}>
              {page}
            </button>
          ))}
      </div>
      <div className="w-24 flex gap-2 justify-start">
        {currentPage !== totalPages && (
          <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} className="w-10 text-2xl font-bold">
            &#8594;
          </button>
        )}
        {/* {pageGroupIndex < totalGroups - 1 && (
          <button onClick={goToNextGroup} className="font-extrabold w-6 text-stone-200">
            &#707;&#707;
          </button>
        )} */}
      </div>
    </div>
  );
}
