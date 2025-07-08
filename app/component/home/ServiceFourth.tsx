import Image from "next/image";
import { Service } from "@/app/lib/types";

export const ServiceFourth = ({ data }: { data: Service }) => {
  return (
    <div className="relative -bottom-7 -z-20 flex flex-col items-center gap-10 w-full pt-12 pb-20 px-10 md:pt-36 md:pb-40 3xl:pb-40 text-center bg-customGray md:bg-customGray-6">
      <Image src={data.imgSrc || ""} alt="" width={720} height={169} className="w-3/4 sm:max-w-[360px]" />
      <div className="md:w-[36%] text-sm md:font-medium md:text-base">{data.description}</div>
    </div>
  );
};
