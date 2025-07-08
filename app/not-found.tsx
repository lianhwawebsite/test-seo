import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");
  return (
    <div className="h-[95vh] flex flex-col items-center justify-center gap-10">
      <Image src="/images/error.svg" alt="" width={455} height={104} className="w-1/2 md:w-fit" />
      <div className="font-medium text-lg text-primary text-center">
        Unfortunately,
        <br /> this page doesn't exist.
      </div>
      <Link href="/" className="bg-primary text-white px-6 py-2">
        返回首頁
      </Link>
    </div>
  );
}
