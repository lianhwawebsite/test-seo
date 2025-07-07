import Link from "next/link";
import { NavbarItem, Service } from "@/app/lib/types";
import Image from "next/image";

export const ServiceThird = ({ data, productPage }: { data: Service; productPage: NavbarItem | undefined }) => {
  return (
    <div className="flex flex-col md:h-96 w-full md:grid mx-auto max-w-[1440px] gap-4 lg:gap-20 md:grid-rows-1 md:grid-cols-6 p-10 lg:pt-16 lg:pb-20 lg:px-52">
      <div className="mx-auto md:col-span-3 flex flex-col justify-center items-center gap-6 text-center md:text-left">
        <div className="text-center text-xl md:text-3xl lg:text-4xl font-medium md:leading-14">{data.title}</div>
        <Link href={productPage?.href || "/"} className="hidden md:flex gap-10 pl-15 pr-4 py-2 bg-theme-1 text-white font-bold text-xs rounded-xl md:text-base">
          <div>{productPage?.label}</div>
          <Image src="/images/home/rightArrow.svg" alt="" width={24} height={24} className="" />
        </Link>
      </div>
      <div className="md:col-span-3 text-sm text-center md:text-base md:text-left md:row-span-1 md:font-medium flex items-center">{data.description}</div>
      <Link href={productPage?.href || "/"} className="w-fit h-fit justify-center items-center flex gap-10 mt-2 pl-15 pr-4 py-2 mx-auto bg-theme-1 text-white text-sm font-normal rounded-lg md:text-base md:font-bold md:hidden">
        <div>{productPage?.label}</div>
        <Image src="/images/home/rightArrow.svg" alt="" width={24} height={24} className="" />
      </Link>
    </div>
  );
};
