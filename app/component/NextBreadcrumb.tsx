"use client";
import { Fragment } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import data from "@/data.json";

type NavbarItemData = {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};

const NextBreadcrumb = () => {
  const searchParams = useSearchParams();
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const flattenNavbarItems = (items: NavbarItemData[]) => {
    const map: Record<string, string> = {};

    items.forEach((item: NavbarItemData) => {
      if (item.href && item.href !== "/") {
        let hrefSplit = item.href.split("/");
        map[hrefSplit[hrefSplit.length - 1]] = item.label;
      } else if (item.href === "/") {
        map["home"] = item.label;
      }

      if (item.subItems?.length) {
        item.subItems.forEach((sub) => {
          if (sub.href) {
            let hrefSplit = sub.href.split("/");
            map[hrefSplit[hrefSplit.length - 1]] = sub.label;
          }
        });
      }
    });

    return map;
  };

  const nameMap = flattenNavbarItems(data?.navbarItems);
  const Separator = () => {
    return <span className="text-sm mx-1.5 leading-[1] inline-block align-top"> &gt; </span>;
  };
  const listClasses = "text-sm leading-[1.21] tracking-[.3px]";
  const activeClasses = "underline decoration-1";

  return (
    <>
      {paths !== "/" && (
        <ul className="flex w-full text-md">
          <li className={listClasses}>
            <Link href={"/"}>{nameMap?.["home"]}</Link>
          </li>
          {pathNames.length > 0 && <Separator />}
          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;

            const isProductDetailPage = pathNames[index - 1] === "products" && data?.products?.some((item) => item.id === link);
            const product = data?.products?.find((item) => item.id === link);

            const typeParam = searchParams.get("types");

            // 如果這是最後一層而且是產品頁面，要先插入 type 再插入產品名稱
            if (isProductDetailPage && product) {
              return (
                <Fragment key={index}>
                  {/* type 層 */}
                  <li className={listClasses}>
                    <Link href={`/products?types=${encodeURIComponent(product.type)}`}>{product.type}</Link>
                  </li>
                  <Separator />
                  {/* 藥品名稱 */}
                  <li className={itemClasses}>
                    <Link href={href}>{product.name}</Link>
                  </li>
                </Fragment>
              );
            }

            return (
              <Fragment key={index}>
                {/* 一般層級顯示 */}
                <li className={link === "products" && typeParam ? listClasses : itemClasses}>
                  <Link href={href}>{nameMap?.[link] || link}</Link>
                </li>

                {/* 如果是 /products 且 query 有 types，要插入 type */}
                {link === "products" && typeParam && (
                  <>
                    <Separator />
                    <li className={itemClasses}>
                      <Link href={`/products?types=${encodeURIComponent(typeParam)}`}>{typeParam}</Link>
                    </li>
                  </>
                )}

                {/* 分隔線（不加在最後一層） */}
                {pathNames.length !== index + 1 && !(link === "products" && typeParam) && <Separator />}
              </Fragment>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default NextBreadcrumb;
