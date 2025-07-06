import Image from "next/image";
import { Service } from "@/app/lib/types";

export const ServiceFourth = ({ data }: { data: Service }) => {
  return (
    <div className="flex flex-col items-center gap-10 w-full p-10 md:p-24 text-center bg-customGray-6">
      <Image src="/images/home/landing_page_slogan_pc_mo.png" alt="" width={720} height={169} className="w-fit" />
      <div className="w-[50%] text-sm font-medium md:text-base">{data.description}</div>
    </div>
  );
};
