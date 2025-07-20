import Link from "next/link";
import { NavbarItem, Service } from "@/app/lib/types";
import Image from "next/image";

export const ServiceThird = ({ data, productPage }: { data: Service; productPage: NavbarItem | undefined }) => {
  return (
    <div className="relative -bottom-4 flex flex-col md:h-96 w-full md:grid mx-auto max-w-[1440px] gap-4 lg:gap-20 md:grid-rows-1 md:grid-cols-6 p-10 lg:pt-16 lg:pb-20 lg:px-52">
      <div className="mx-auto md:col-span-3 flex flex-col justify-center items-center gap-6 text-center md:text-left">
        <div className="text-center text-xl md:text-3xl lg:text-4xl font-medium md:leading-14">{data.title}</div>
        <Link href={productPage?.href || "/"} className="hidden relative bg-theme-1 rounded-lg px-10 py-2.5 md:pl-15 md:rounded-xl md:pr-20 md:py-3 cursor-pointer md:flex">
          <span className="text-white font-medium text-xs tracking-[0px] md:font-bold md:text-base md:leading-[1.32] md:tracking-[.5px]">{productPage?.label}</span>
          <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
          <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
        </Link>
      </div>
      <div className="md:col-span-3 text-sm text-center md:text-base md:text-left md:row-span-1 md:font-medium flex items-center">{data.description}</div>
      <Link href={productPage?.href || "/"} className="flex w-fit mx-auto relative bg-theme-1 rounded-lg px-15 py-2.5 md:pl-15 cursor-pointer md:hidden">
        <span className="text-white font-medium text-xs tracking-[0px]">{productPage?.label}</span>
        <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
        <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
      </Link>
    </div>
  );
};
