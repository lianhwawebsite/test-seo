import Image from "next/image";

export const ServiceFirst = ({ title, description, imgSrcPc, imgSrcMo }: { title: string; description: string; imgSrcPc: string; imgSrcMo: string }) => {
  return (
    <div className="mx-auto max-w-[1440px] flex flex-col items-center gap-8 md:gap-20 lg:gap-28 w-full md:py-12 lg:p-20 text-center bg-white">
      <Image src={imgSrcPc} alt="" width={1440} height={837} className="hidden w-fit md:flex md:px-10 lg:px-0 xl:w-8/12 xl:max-w-[1440px]" />
      <Image src={imgSrcMo} alt="" width={1440} height={837} className="w-fit pt-10 px-5 md:hidden" />
      <div className="flex flex-col px-6 pb-10 gap-4 md:gap-6">
        <div className="text-[24px] leading-[1.3] font-semibold md:text-4xl lg:text-[40px] md:font-bold lg:leading-11">
          {title.split("\n").map((line, i) => (
            <span className="md:leading-13" key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
        <div className="text-sm text-start leading-[1.28] md:text-center md:text-[15px] md:leading-[1.6] tracking-[0.4px] md:w-3/4 mx-auto">{description}</div>
      </div>
    </div>
  );
};
