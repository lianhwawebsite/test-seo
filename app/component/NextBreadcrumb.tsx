"use client";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
    return <span className="text-stone-400"> &#x2f; </span>;
  };
  const listClasses = "text-stone-400 hover:underline mx-2";
  const activeClasses = "text-stone-600";

  return (
    <>
      {paths !== "/" && (
          <ul className="flex py-5 px-10 w-full justify-center sm:justify-end">
            <li className={listClasses}>
              <Link href={"/"}>{nameMap?.["home"]}</Link>
            </li>
            {pathNames.length > 0 && <Separator />}
            {pathNames.map((link, index) => {
              let href = `/${pathNames.slice(0, index + 1).join("/")}`;
              let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
              let itemText = nameMap?.[link] || data?.products?.find((item) => item.id === link)?.name || link;
              return (
                <Fragment key={index}>
                  <li className={itemClasses}>
                    <Link href={href}>{itemText}</Link>
                  </li>
                  {pathNames.length !== index + 1 && <Separator />}
                </Fragment>
              );
            })}
          </ul>
      )}
    </>
  );
};

export default NextBreadcrumb;
