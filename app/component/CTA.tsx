"use client";
import Image from "next/image";
import Link from "next/link";

export function CTA({ href, label }: { href: string; label: string }) {
  return (
    <>
      <Link href={href} className="relative bg-theme-1 rounded-lg px-10 py-2.5 md:pl-15 md:rounded-xl md:pr-20 md:py-3 cursor-pointer flex active:bg-customDarkGray">
        <span className="text-white font-medium text-xs tracking-[0px] md:font-bold md:text-base md:leading-[1.32] md:tracking-[.5px]">{label}</span>
        <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
        <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
      </Link>
    </>
  );
}

export function CTAFunc({ handleFunc, label }: { handleFunc: () => void; label: string }) {
  return (
    <>
      <button type="button" className="relative z-50 bg-theme-1 rounded-lg text-white px-11.75 py-2.75 text-xs leading-[1.22] tracking-0 active:bg-customDarkGray" onClick={handleFunc}>
        <p>{label}</p>
        <Image src="/images/arrow_right_white.svg" alt="" width={17} height={17} className="w-fit h-fit absolute top-[50%] -translate-y-[50%] right-[2px]" />
      </button>
    </>
  );
}
