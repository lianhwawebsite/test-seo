import Image from "next/image";
import { Service } from "@/app/lib/types";

export const ServiceFourth = ({ data }: { data: Service }) => {

  return (
    <div className="flex flex-col items-center gap-10 w-full py-12 px-10 md:pt-36 md:pb-28 3xl:pb-40 text-center bg-customGray md:bg-customGray-6">
      <Image src="/images/home/landing_page_Slogan_pc_mo.png" alt="" width={720} height={169} className="w-3/4 sm:max-w-[360px]" />
      <div className="md:w-[36%] text-sm md:font-medium md:text-base">{data.description}</div>
    </div>
  );
};
