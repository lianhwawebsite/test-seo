import { notFound } from "next/navigation";
import type { Metadata } from "next";
import data from "@/enData.json";
import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import { CTA } from "@/app/component/CTA";
import { SeoHead } from "@/app/component/SeoHead";
import { abs } from "@/app/config";
import { Fragment } from "react";

type Ingredient = {
  spec?: string;
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
  mainIngredients?: Ingredient[];
  indications?: string;
  dosageAndAdministration?: string;
  precautions?: { id: string; precaution: string }[];
  licenseUrl?: string;
  packaging?: string;
  ingredientsNote?: string;
  ingredientsNoteSecond?: string;
  mainIngredientsSecond?: Ingredient[];
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
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .join(", ");

  const dosageForm = p.type?.split("、")?.[0]?.trim() || p.type || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: p.name,
    description: p.indications || `${p.name} Introduction`,
    nonProprietaryName: p.alternativeName || undefined,
    identifier: p.medicineCode || undefined,
    activeIngredient: activeIngredient || undefined,
    dosageForm,
    manufacturer: {
      "@type": "Organization",
      name: "Lian Hwa Pharmaceutical",
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = findProduct(productId);
  if (!product) return notFound();

  const title = `${product.name} ｜Lian Hwa Pharmaceutical`;
  const description = product.indications || `${product.name} Introduction`;

  return {
    title,
    description,
    alternates: { canonical: `/en/products/${productId}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "Lian Hwa Pharmaceutical",
      locale: "en",
      url: `/en/products/${productId}`,
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
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/en") },
      { "@type": "ListItem", position: 2, name: "Products", item: abs("/en/products") },
      { "@type": "ListItem", position: 3, name: product.name, item: abs(`/en/products/${productId}`) },
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
            <div className="absolute top-0 left-0 h-[32px]  border-theme-1 border-3 rounded-4xl"></div>
            <h1 className="font-bold text-2xl leading-[1.22] tracking-[1px]">{product?.name}</h1>
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

function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  const hasSpec = ingredients.some((i) => i.spec);

  if (!hasSpec) {
    return (
      <>
        {ingredients.map((ingredient, idx) => (
          <IngredientRow key={idx} ingredient={ingredient} />
        ))}
      </>
    );
  }

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
          <p className="font-medium text-sm md:text-base mt-2 mb-0.5">{group.spec}:</p>
          {group.items.map((ingredient, idx) => (
            <IngredientRow key={idx} ingredient={ingredient} />
          ))}
        </div>
      ))}
    </>
  );
}

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
      <article className="flex flex-col gap-6 md:gap-9 justify-between md:hidden">
        <div className="text-primary flex flex-col gap-1.5">
          <h1 className="font-bold text-xl leading-[1.22] tracking-[0.6px]">{product?.name}</h1>
        </div>
        <p className="text-sm leading-[1.16] tracking-[0px]">{product?.medicineCode}</p>
      </article>

      <article className="md:col-start-1 md:row-start-2 flex flex-col gap-y-6" itemScope itemType="https://schema.org/Product">
        <div className="text-sm leading-[1.5] tracking-[0px] md:text-base md:leading-[1.7] md:tracking-[0.5px]">
          <p>{product?.ingredientsNote}</p>

          {product?.mainIngredients && <IngredientList ingredients={product.mainIngredients} />}

          {Object.keys(product).includes("ingredientsNoteSecond") && (
            <>
              <br />
              <p>{product?.ingredientsNoteSecond}</p>
            </>
          )}
          {Object.keys(product).includes("mainIngredientsSecond") && product?.mainIngredientsSecond && <IngredientList ingredients={product.mainIngredientsSecond} />}
        </div>

        {product?.dosageAndAdministration?.length === 0 ? null : (
          <div>
            <p className="font-medium text-sm md:text-base">Dosage & Administration</p>
            {product?.dosageAndAdministration?.split("\n").map((sentence, idx) => (
              <p key={idx} className="text-sm md:text-base">
                {sentence}
              </p>
            ))}
          </div>
        )}

        {product?.indications?.length === 0 ? null : (
          <div>
            <p className="font-medium text-sm md:text-base">Indications</p>
            {product?.indications?.split("\n").map((sentence, idx) => (
              <p key={idx} className="text-sm md:text-base">
                {sentence}
              </p>
            ))}
          </div>
        )}

        {product?.packaging?.length === 0 ? null : (
          <div>
            <p className="font-medium text-sm md:text-base">Packaging</p>
            {product?.packaging?.split("\n").map((sentence, idx) => (
              <p key={idx} className="text-sm md:text-base">
                {sentence}
              </p>
            ))}
          </div>
        )}

        {product?.precautions?.length === 0 ? null : (
          <div className="text-primary">
            <p className="font-medium text-sm md:text-base">Precautions</p>
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

        <div className="flex items-center h-20 mb-4">{product?.licenseUrl && <CTA href={product.licenseUrl} label="Official Registration Details" />}</div>
      </article>
    </section>
  );
}
