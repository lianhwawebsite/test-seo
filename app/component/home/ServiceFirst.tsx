import Image from "next/image";

export const ServiceFirst = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center gap-30 w-full p-10 md:p-24 text-center">
        <Image src="/images/home/landing_page_KV_pc.png" alt="" width={1440} height={837} className="w-fit" />
      <div className="flex flex-col gap-9">
        <div className="text-3xl md:text-5xl font-medium">{title}</div>
        <div className="text-sm font-medium md:text-base">{description}</div>
      </div>
    </div>
  );
};
