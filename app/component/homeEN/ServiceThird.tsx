import Link from "next/link";
import { NavbarItem, Service } from "@/app/lib/types";
import Image from "next/image";

export const ServiceThird = ({ data, productPage }: { data: Service; productPage: NavbarItem | undefined }) => {
  return (
    <div className="relative -bottom-4 flex flex-col md:h-96 w-full md:grid mx-auto max-w-[1440px] gap-4 lg:gap-20 md:grid-rows-1 md:grid-cols-6 py-10 px-6 lg:pt-16 lg:pb-20 lg:px-52">
      <div className="mx-auto md:col-span-3 flex flex-col justify-center items-center gap-6 text-center md:text-left">
        <div className="text-center text-xl md:text-[26px] lg:text-[34px] font-semibold md:leading-[1.3]">{data.title}</div>
        <Link href={productPage?.href || "/"} className="hidden relative bg-theme-1 rounded-lg px-10 py-2.5 md:pl-15 md:rounded-xl md:pr-20 md:py-3 cursor-pointer md:flex active:bg-customDarkGray">
          <span className="text-white font-medium text-xs tracking-[0px] md:font-medium md:text-base md:leading-[1.32] md:tracking-[.5px]">All {productPage?.label}</span>
          <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
          <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
        </Link>
      </div>
      <div className="md:col-span-3 text-sm text-start leading-[1.28] md:text-[15px] md:leading-[1.6] tracking-[0.4px] md:row-span-1 flex items-center whitespace-pre-line">{data.description}</div>
      <Link href={productPage?.href || "/"} className="flex w-fit mx-auto relative bg-theme-1 rounded-lg px-15 py-2.5 md:pl-15 cursor-pointer md:hidden active:bg-customDarkGray">
        <span className="text-white font-medium text-xs tracking-[0px]">All {productPage?.label}</span>
        <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
        <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
      </Link>
    </div>
  );
};
