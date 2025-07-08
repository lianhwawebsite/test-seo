"use client";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import data from "@/data.json";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  const id = params.productId;
  const product = data.products.find((p) => p.id === id);
  if (!product) return notFound();


  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6  md:gap-20 mt-10">
      <section className="border border-stone-300 bg-stone-300 h-48 md:h-full"></section>
      <section className="flex w-full flex-col">
        <article className="flex flex-col w-full" itemScope itemType="https://schema.org/Product">
          <div className="my-4">
            <p className="w-full text-sm text-stone-500 mb-1">動物藥製字第 {product?.medicineCode} 號</p>
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <h2>{product?.englishName}</h2>
          </div>
          <p className="w-full">藥品類別: {product?.type}</p>
          <p className="w-full">
            適用動物:&nbsp;
            {product?.animals.map((animal, index) => (
              <span key={animal} className="w-full">
                {animal}
                {index < product.animals.length - 1 && "，"}
              </span>
            ))}
          </p>
          <div className="w-full">
            <div>主要成分:</div>
            {product?.mainIngredients.map((ingredient, idx) => (
              <div key={idx} className="w-full">
                {ingredient.name}.....................................{ingredient.amount}
              </div>
            ))}
          </div>
          <p className="w-full">適應症: {product?.indications}</p>
          <p className="w-full">用法用量: {product?.dosageAndAdministration}</p>
          <div className="w-full text-red-800">
            注意事項:
            <ol className="list-decimal pl-5">
              {product?.precautions.map((precaution, index) => (
                <li key={index} className="w-full">
                  {precaution.precaution}
                </li>
              ))}
            </ol>
          </div>
          <p className="w-full">包裝: {product?.packaging}</p>
          <p className="w-full mb-6">價格: {product?.price}</p>
          <Link href={product?.licenseUrl || ""} className="flex items-center gap-2 p-4 bg-stone-300 text-stone-50 w-fit cursor-pointer">
            動物用藥品許可證查詢
          </Link>
        </article>
      </section>
    </section>
  );
}
