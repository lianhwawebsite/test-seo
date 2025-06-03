"use client";
import { useParams } from "next/navigation";
import data from "@/data.json";

export default function Page() {
  const params = useParams();
  const id = params.productId;
  const product = data.products.find((p) => p.id === id);

  return (
    <section className="flex w-full flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <a href="/products" className="border px-4 py-2 rounded-full w-fit">
          Back
        </a>
      </div>
      <article className="flex flex-col w-full border p-4" itemScope itemType="https://schema.org/Product">
        <h2 className="w-full text-xl mb-3">藥品詳情</h2>
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
        <p className="w-full mb-6">藥品簡介: {product?.description}</p>
      </article>
    </section>
  );
}
