"use client";
import { useParams } from "next/navigation";
import data from "@/data.json";

export default function Page() {
  const params = useParams();
  const id = params.productId;
  const product = data.products.find((p) => p.id === id);

  return (
    <section className="flex w-full flex-col">
      <div className="my-4">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <h2>{product?.englishName}</h2>
      </div>
      <article className="flex flex-col w-full border p-4" itemScope itemType="https://schema.org/Product">
        <h2 className="w-full text-xl mb-3">藥品詳情</h2>
        <p className="w-full">動物藥製字號: {product?.medicineCode}</p>
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
        <p className="w-full">
          主要成分:&nbsp;
          {product?.mainIngredients.map((ingredient, index) => (
            <span key={ingredient} className="w-full">
              {ingredient}
              {index < product.mainIngredients.length - 1 && "，"}
            </span>
          ))}
        </p>
        <p className="w-full">適應症: {product?.indications}</p>
        <p className="w-full">用法用量: {product?.dosageAndAdministration}</p>
        <p className="w-full">注意事項: {product?.precautions}</p>
        <p className="w-full">包裝: {product?.packaging}</p>
        <p className="w-full mb-6">價格: {product?.price}</p>
      </article>
    </section>
  );
}
