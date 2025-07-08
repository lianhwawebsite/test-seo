import { headers } from "next/headers";
import Link from "next/link";
import { ErrorIcon } from "@/app/lib/icons";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");
  return (
    <div className="h-[95vh] flex flex-col items-center justify-center gap-10">
      <div className="w-1/2 md:w-fit">
        <ErrorIcon />
      </div>
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
