import Link from "next/link";
import { NavbarItem, Service } from "@/app/lib/types";
import Image from "next/image";

export const ServiceThird = ({ data, productPage }: { data: Service; productPage: NavbarItem | undefined }) => {
  return (
    <div className="h-96 w-full grid mx-auto max-w-[1440px] gap-20 md:grid-cols-6 p-10 md:p-24">
      <div className="order-2 md:order-1 md:col-span-3 flex flex-col justify-center items-center gap-6 text-center md:text-left">
        <div className="text-3xl md:text-4xl font-medium md:leading-14">{data.title}</div>
        <Link href={productPage?.href || "/"} className="flex gap-10 pl-15 pr-4 py-2 bg-theme-1 text-white font-bold text-xs rounded-xl md:text-base">
          <div>{productPage?.label}</div>
          <Image src="/images/home/rightArrow.svg" alt="" width={24} height={24} className="" />
        </Link>
      </div>
      <div className="order-1 md:order-2 col-span-3 text-sm font-medium md:text-base flex items-center">{data.description}</div>
    </div>
  );
};
