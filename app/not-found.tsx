import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-9 h-full my-auto md:gap-11.5">
      <Image src="/images/error.svg" alt="Arrow Right" width={300} height={52} className="w-[45%] md:w-fit md:h-fit" />
      <div className="font-medium text-xs leading-[1.7] tracking-[0px] md:text-base md:leading-[1.26] md:tracking-[0.4px] text-center">
        很抱歉，
        <br /> 您所造訪的頁面不存在。
      </div>
      <Link href="/" className="relative bg-theme-1 rounded-lg px-14.5 py-2.5 md:pl-15 md:rounded-xl md:pr-20 md:py-3 cursor-pointer flex">
        <span className="text-white font-medium text-xs tracking-[0px] md:font-bold md:text-base md:leading-[1.32] md:tracking-[.5px]">返回首頁</span>
        <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
        <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
      </Link>
    </div>
  );
}
