import { Service } from "@/app/lib/types";
import Image from "next/image";

export const ServiceSecond = ({ data }: { data: Service }) => {
  return (
    <div className="w-full bg-customGray md:bg-customGray-6">
      <div className="w-full flex flex-col md:grid mx-auto max-w-[1440px] gap-8 lg:gap-20 md:grid-rows-1 md:grid-cols-6 py-12 px-10 lg:py-16 lg:px-52">
        <div className="flex flex-col justify-center items-center gap-6 text-center md:row-span-1 md:col-span-3 md:text-left">
          <Image src={data.imgSrcPc || ""} alt="" width={720} height={754} className="hidden h-fit md:block" />
          <Image src={data.imgSrcMo || ""} alt="" width={720} height={754} className="block w-10/12 sm:w-2/4 md:hidden" />
        </div>
        <div className="md:col-span-3 text-sm text-center md:text-base md:leading-[2.2] tracking-[0.4px]  flex items-center md:font-medium md:text-left">{data.description}</div>
      </div>
    </div>
  );
};
