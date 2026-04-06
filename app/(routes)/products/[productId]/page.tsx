import { notFound } from "next/navigation";
import type { Metadata } from "next";
import data from "@/data.json";
import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import { CTA } from "@/app/component/CTA";
import { SeoHead } from "@/app/component/SeoHead";
import { abs } from "@/app/config";
import { Fragment } from "react";

type Ingredient = {
  spec?: string; // ✅ 新增，有些產品的成分會有規格分組
  name?: string;
  amount?: string;
};

type Product = {
  id: string;
  name: string;
  type: string;
  animals: string[];
  alternativeName?: string;
  medicineCode?: string;
  mainIngredients?: Ingredient[]; // ✅ 使用新的 Ingredient 型別
  indications?: string;
  dosageAndAdministration?: string;
  precautions?: { id: string; precaution: string }[];
  licenseUrl?: string;
  packaging?: string;
  ingredientsNote?: string;
  ingredientsNoteSecond?: string;
  mainIngredientsSecond?: Ingredient[]; // ✅ 同步更新
  ogImage?: string;
};

type Props = { params: Promise<{ productId: string }> };

function findProduct(id: string): Product | undefined {
  const list = (data as any).products as Product[];
  return list.find((p) => p.id === id);
}

function buildDrugSchema(p: Product) {
  const activeIngredient = (p.mainIngredients ?? [])
    .map((i) => [i?.name, i?.amount].filter(Boolean).join(" "))
    .filter(Boolean)
    // ✅ 去除重複（有 spec 時同名成分會出現多次）
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .join(", ");

  const dosageForm = p.type?.split("、")?.[0]?.trim() || p.type || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: p.name,
    description: p.indications || `${p.name} 的產品資訊`,
    nonProprietaryName: p.alternativeName || undefined,
    identifier: p.medicineCode || undefined,
    activeIngredient: activeIngredient || undefined,
    dosageForm,
    manufacturer: {
      "@type": "Organization",
      name: "聯華製藥廠",
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = findProduct(productId);
  if (!product) return notFound();

  const title = `${product.name} 介紹｜聯華製藥廠`;
  const description = product.indications || `${product.name} 的產品資訊`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${productId}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "聯華製藥廠",
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

      <section className="mx-auto max-w-[1200px]">
        <NextBreadcrumb />
      </section>

      <section className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-8 gap-6 mt-6 md:gap-0 md:mt-10 font-notoSansTC">
        <section className="flex flex-col gap-y-10 md:col-span-8 md:col-start-3">
          <div className="hidden relative px-6 md:block">
            <div className="absolute top-0 left-0 h-[48px] border-theme-1 border-3 rounded-4xl"></div>
            <h1 className="font-bold text-2xl leading-[1.22] tracking-[1px]">{product?.name}</h1>
            <h2 className="font-bold text-lg leading-[1.22] tracking-[.6px]">{product?.alternativeName}</h2>
          </div>
          <div className="grid md:grid-cols-6">
            <p className="hidden col-span-2 px-6 font-medium text-base leading-[1.26] tracking-[.4px] md:block">{product?.medicineCode}</p>
            <ProductDetail product={product} />
          </div>
        </section>
      </section>
    </>
  );
}

// ────────────────────────────────────────────────
// ✅ 成分列表：判斷是否有 spec，決定顯示方式
// ────────────────────────────────────────────────
function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  // 判斷這份成分列表有沒有用到 spec
  const hasSpec = ingredients.some((i) => i.spec);

  if (!hasSpec) {
    // ── 無 spec：原本的直接列出方式 ──
    return (
      <>
        {ingredients.map((ingredient, idx) => (
          <IngredientRow key={idx} ingredient={ingredient} />
        ))}
      </>
    );
  }

  // ── 有 spec：依 spec 分組，保留原始順序 ──
  // 用 reduce 建立 [{ spec, items[] }] 的結構，同時維持第一次出現的順序
  const groups = ingredients.reduce<{ spec: string; items: Ingredient[] }[]>((acc, ingredient) => {
    const specLabel = ingredient.spec ?? "";
    const existing = acc.find((g) => g.spec === specLabel);
    if (existing) {
      existing.items.push(ingredient);
    } else {
      acc.push({ spec: specLabel, items: [ingredient] });
    }
    return acc;
  }, []);

  return (
    <>
      {groups.map((group) => (
        <div key={group.spec}>
          {/* spec 標題，例如「25g 裝:」 */}
          <p className="font-medium text-sm md:text-base mt-2 mb-0.5">{group.spec}:</p>
          {group.items.map((ingredient, idx) => (
            <IngredientRow key={idx} ingredient={ingredient} />
          ))}
        </div>
      ))}
    </>
  );
}

// ────────────────────────────────────────────────
// 單行成分（抽出來重用，避免重複）
// ────────────────────────────────────────────────
function IngredientRow({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div>
      {ingredient.name}.....................................&nbsp;
      {ingredient.amount?.split("\n").map((sentence, idx) => (
        <Fragment key={idx}>
          <span className="text-sm md:text-base">{sentence}</span>
          <br />
        </Fragment>
      ))}
    </div>
  );
}

function ProductDetail({ product }: { product: Product }) {
  return (
    <section className="flex flex-col gap-y-6 md:gap-y-10 col-span-4">
      <article className="flex flex-col gap-6 justify-between md:hidden">
        <div className="text-primary flex flex-col gap-1.5">
          <h1 className="font-bold text-xl leading-[1.22] tracking-[0.6px]">{product?.name}</h1>
          <h2 className="font-medium text-base leading-[1.22] tracking-[0px]">{product?.alternativeName}</h2>
        </div>
        <p className="text-sm leading-[1.16] tracking-[0px]">{product?.medicineCode}</p>
      </article>

      <article className="md:col-start-1 md:row-start-2 flex flex-col gap-y-6" itemScope itemType="https://schema.org/Product">
        {/* 成分區塊 */}
        <div className="text-sm leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[0.5px]">
          <p>{product?.ingredientsNote}</p>

          {/* ✅ 改用 IngredientList，自動判斷是否需要分組 */}
          {product?.mainIngredients && <IngredientList ingredients={product.mainIngredients} />}

          {/* 第二組成分（原本邏輯不變） */}
          {Object.keys(product).includes("ingredientsNoteSecond") && (
            <>
              <br />
              <p>{product?.ingredientsNoteSecond}</p>
            </>
          )}
          {Object.keys(product).includes("mainIngredientsSecond") && product?.mainIngredientsSecond && <IngredientList ingredients={product.mainIngredientsSecond} />}
        </div>

        {/* 用法用量 */}
        {product?.dosageAndAdministration?.length === 0 ? null : (
          <div>
            <p className="font-medium text-sm md:text-base">用法用量</p>
            {product?.dosageAndAdministration?.split("\n").map((sentence, idx) => (
              <p key={idx} className="text-sm md:text-base">
                {sentence}
              </p>
            ))}
          </div>
        )}

        {/* 適應症 */}
        {product?.indications?.length === 0 ? null : (
          <div>
            <p className="font-medium text-sm md:text-base">適應症</p>
            {product?.indications?.split("\n").map((sentence, idx) => (
              <p key={idx} className="text-sm md:text-base">
                {sentence}
              </p>
            ))}
          </div>
        )}

        {/* 包裝 */}
        {product?.packaging?.length === 0 ? null : (
          <div>
            <p className="font-medium text-sm md:text-base">包裝</p>
            {product?.packaging?.split("\n").map((sentence, idx) => (
              <p key={idx} className="text-sm md:text-base">
                {sentence}
              </p>
            ))}
          </div>
        )}

        {/* 注意事項 */}
        {product?.precautions?.length === 0 ? null : (
          <div className="text-primary">
            <p className="font-medium text-sm md:text-base">注意事項</p>
            {product?.precautions?.length === 1 ? (
              <>
                {product?.precautions?.map((precaution) => (
                  <div key={precaution.id} className="text-sm md:text-base">
                    {precaution.precaution.split("\n").map((sentence, idx) => (
                      <Fragment key={idx}>
                        <span className="text-sm md:text-base">{sentence}</span>
                        <br />
                      </Fragment>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <ol className="list-decimal pl-5">
                {product?.precautions?.map((precaution) => (
                  <li key={precaution.id} className="text-sm md:text-base">
                    {precaution.precaution.split("\n").map((sentence, idx) => (
                      <Fragment key={idx}>
                        <span className="text-sm md:text-base">{sentence}</span>
                        <br />
                      </Fragment>
                    ))}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        <div className="flex items-center h-20 mb-4">{product?.licenseUrl && <CTA href={product.licenseUrl} label="動物用藥品許可證查詢" />}</div>
      </article>
    </section>
  );
}
