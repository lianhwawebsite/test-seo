import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-9 h-full my-auto md:gap-11.5">
      <Image src="/images/error.svg" alt="Arrow Right" width={300} height={52} className="w-[45%] md:w-fit md:h-fit" />
      <div className="mx-16 font-semibold text-xs leading-[1.5] tracking-[0px] md:mx-0 md:font-normal md:text-[15px] md:leading-[1.6] md:tracking-[0.4px] text-center">
        We’re sorry,
        <br className="md:hidden" />
        the page you are looking for
        <br /> does not exist or has been moved.
      </div>
      <Link href="/en" className="relative bg-theme-1 rounded-lg px-11.5 py-2.5 md:pl-15 md:rounded-xl md:pr-15 md:py-3 cursor-pointer flex">
        <span className="text-white font-semibold text-xs tracking-[0px] md:font-bold md:text-base md:leading-[1.32] md:tracking-[.5px]">Back to Home</span>
        <Image src="/images/arrow_right_white_thick.svg" alt="Arrow Right" width={24} height={24} className="hidden absolute top-[50%] -translate-y-[50%] right-4 md:block w-fit h-fit" />
        <Image src="/images/arrow_right_white.svg" alt="Arrow Right" width={17} height={17} className="absolute top-[50%] -translate-y-[50%] right-0.5 w-fit h-fit md:hidden" />
      </Link>
    </div>
  );
}
