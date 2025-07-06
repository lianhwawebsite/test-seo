import Link from "next/link";
import { Service } from "@/app/lib/types";
import Image from "next/image";

export const ServiceSecond = ({ data }: { data: Service; }) => {
  return (
    <div className="w-full bg-customGray-6">
      <div className="w-full grid mx-auto max-w-[1440px] gap-20 md:grid-cols-6 p-10 md:p-24">
        <div className="order-2 md:order-1 md:col-span-3 flex flex-col justify-center items-center gap-6 text-center md:text-left">
          <Image src="/images/home/landing_page_service_pc.png" alt="" width={720} height={754} className="w-fit" />
        </div>
        <div className="order-1 md:order-2 col-span-3 text-sm font-medium md:text-base flex items-center">{data.description}</div>
      </div>
    </div>
  );
};
