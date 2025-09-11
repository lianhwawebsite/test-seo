import Image from "next/image";
import { Service } from "@/app/lib/types";

export const ServiceFourth = ({ data }: { data: Service }) => {
  return (
    <div className="relative -bottom-7 -z-20 flex flex-col items-center gap-10 w-full pt-12 pb-20 px-10 text-center bg-customGray md:pt-36 md:pb-40 md:bg-customGray-6 2xl:-bottom-12 2xl:pb-40 3xl:pb-60 3xl:-bottom-16">
      <Image src={data.imgSrc || ""} alt="" width={720} height={169} className="w-3/4 sm:max-w-[360px]" />
      <div className="md:w-[36%] text-sm md:font-medium md:text-sm md:leading-[2.2] tracking-[0.4px] ">{data.description}</div>
    </div>
  );
};
