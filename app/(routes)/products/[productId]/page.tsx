import { notFound } from "next/navigation";
import type { Metadata } from "next";
import data from "@/data.json";
import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import { CTA } from "@/app/component/CTA";
import { SeoHead } from "@/app/component/SeoHead";
import { abs } from "@/app/config";

type Product = {
  id: string;
  name: string;
  type: string;
  animals: string[];
  englishName?: string;
  medicineCode?: string;
  mainIngredients?: { name?: string; amount?: string }[];
  indications?: string;
  dosageAndAdministration?: string;
  precautions?: { id: string; precaution: string }[];
  licenseUrl?: string;
  packaging?: string;
  ingredientsNote?: string;
  ogImage?: string;
};

type Props = {params: Promise<{ productId: string }>};

function findProduct(id: string): Product | undefined {
  const list = (data as any).products as Product[];
  return list.find((p) => p.id === id);
}

// 把你的資料映射成 schema.org/Drug
function buildDrugSchema(p: Product) {
  const activeIngredient = (p.mainIngredients ?? [])
    .map((i) => [i?.name, i?.amount].filter(Boolean).join(" "))
    .filter(Boolean)
    .join(", ");

  const dosageForm = p.type?.split("、")?.[0]?.trim() || p.type || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: p.name,
    description: p.indications || `${p.name} 的產品資訊`,
    nonProprietaryName: p.englishName || undefined,
    identifier: p.medicineCode || undefined,
    activeIngredient: activeIngredient || undefined,
    dosageForm,
    manufacturer: {
      "@type": "Organization",
      name: "某某製藥廠",
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = findProduct(productId);
  if (!product) return notFound();

  const title = `${product.name} 介紹｜某某製藥廠`;
  const description = product.indications || `${product.name} 的產品資訊`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${productId}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "某某製藥廠",
      locale: "zh_TW",
      url: `/products/${productId}`,
      images: ["/images/OG_image.png"],
    },
  };
}

export default async function Page({ params }: Props) {
  const { productId } = await params;
  const product = findProduct(productId);
  if (!product) return notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "產品一覽", item: abs("/products") },
      { "@type": "ListItem", position: 3, name: product.name, item: abs(`/products/${productId}`) },
    ],
  };

  const drug = buildDrugSchema(product);

  return (
    <>
      <SeoHead schema={[breadcrumb, drug]} />

      <section className="mx-auto max-w-[1200px] ">
        <NextBreadcrumb />
      </section>

      <section className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:gap-20 md:mt-10 font-notoSansTC">
        <section className="hidden md:grid grid-cols-2 grid-rows-7 gap-y-6">
          <div className="relative px-6 col-start-2 row-start-1 h-16">
            <div className="absolute top-0 left-0 h-[48px]  border-theme-1 border-3 rounded-4xl"></div>
            <h1 className="font-bold text-2xl leading-[1.22] tracking-[1px]">{product?.name}</h1>
            <h2 className="font-bold text-lg leading-[1.22] tracking-[.6px]">{product?.englishName}</h2>
          </div>
          <p className="px-6 font-medium text-base leading-[1.26] tracking-[.4px] col-start-2 row-start-2">{product?.medicineCode}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-rows-7 gap-y-6">
          <article className="flex flex-col gap-6 justify-between md:hidden">
            <div className="text-primary flex flex-col gap-1.5">
              <h1 className="font-bold text-lg leading-[1.22] tracking-[0.6px]">{product?.name}</h1>
              <h2 className="font-medium text-xs leading-[1.22] tracking-[0px]">{product?.englishName}</h2>
            </div>
            <p className="text-xs leading-[1.16] tracking-[0px]">{product?.medicineCode}</p>
          </article>

          <article className="md:col-start-1 md:row-start-2 md:row-span-6 flex flex-col gap-y-6" itemScope itemType="https://schema.org/Product">
            <div className="text-xs leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[0.5px]">
              <p>{product?.ingredientsNote}</p>
              {product?.mainIngredients?.map((ingredient, idx) => (
                <div key={idx}>
                  {ingredient.name}.....................................&nbsp;{ingredient.amount}
                </div>
              ))}
            </div>

            <div>
              <p className="font-medium text-xs md:text-base">用法用量</p>
              <p className="text-xs md:text-base">{product?.dosageAndAdministration}</p>
            </div>

            <div>
              <p className="font-medium text-xs md:text-base">適應症</p>
              <p className="text-xs md:text-base">{product?.indications}</p>
            </div>

            <div>
              <p className="font-medium text-xs md:text-base">包裝</p>
              <p className="text-xs md:text-base">{product?.packaging}</p>
            </div>

            <div className="text-primary">
              <p className="font-medium text-xs md:text-base">注意事項</p>
              <ol className="list-decimal pl-5">
                {product?.precautions?.map((precaution) => (
                  <li key={precaution.id} className="text-xs md:text-base">
                    {precaution.precaution}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center h-20 mb-4">{product?.licenseUrl && <CTA href={product.licenseUrl} label="動物用藥品許可證查詢" />}</div>
          </article>
        </section>
      </section>
    </>
  );
}