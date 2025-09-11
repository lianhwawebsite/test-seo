import Image from "next/image";

export const ServiceFirst = ({ title, description, imgSrcPc, imgSrcMo }: { title: string; description: string; imgSrcPc: string; imgSrcMo: string }) => {
  return (
    <div className="mx-auto max-w-[1440px] flex flex-col items-center gap-8 md:gap-20 lg:gap-28 w-full md:py-12 lg:p-20 text-center">
      <Image src={imgSrcPc} alt="" width={1440} height={837} className="hidden w-fit md:flex md:px-10 lg:px-0 xl:w-8/12 xl:max-w-[1440px]" />
      <Image src={imgSrcMo} alt="" width={1440} height={837} className="w-fit pt-10 px-5 md:hidden" />
      <div className="flex flex-col px-10 pb-10 gap-4 md:gap-9">
        <div className="text-xl md:text-4xl lg:text-5xl font-medium">{title}</div>
        <div className="text-sm md:font-medium md:text-sm md:leading-[2.2] tracking-[0.4px] md:w-1/2 mx-auto">{description}</div>
      </div>
    </div>
  );
};
