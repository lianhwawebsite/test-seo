import data from "@/data.json";
import { Pagination } from "@/app/component/Pagination";
import { Fragment, useEffect } from "react";
import Link from "next/link";

export default function Table({ query, selectedAnimals, selectedTypes, page, setProductNum }: { query: string; selectedAnimals: string[]; selectedTypes: string[]; page: number; setProductNum: (num: number) => void }) {

  const filteredData = data?.products.filter((item) => {
    const matchQuery = !query || item.name.toLowerCase().includes(query) || item.medicineCode.toLowerCase().includes(query);

    const matchAnimals = selectedAnimals.length === 0 || selectedAnimals.some((a) => item.animals.includes(a));

    const matchTypes = selectedTypes.length === 0 || selectedTypes.some((t) => item.type.includes(t));
    return matchQuery && matchAnimals && matchTypes;
  });
  
  useEffect(() => {
    setProductNum(filteredData.length);
  }, [filteredData]);

  const pageSize = 12;
  const totalResults = filteredData.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const pagedResults = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="col-span-1 flex flex-col md:col-span-3">
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {pagedResults.map((product) => (
          <Fragment key={product.id}>
            <ProductCard product={product} />
          </Fragment>
        ))}
      </section>
      {filteredData.length > 0 && <Pagination currentPage={page} totalPages={totalPages} />}
    </section>
  );
}

function ProductCard({ product }: { product: (typeof data.products)[0] }) {
  return (
    <Link href={`/products/${product.id}`} itemProp="url">
      <article className="" itemScope itemType="https://schema.org/Product">
        <div itemProp="img" className="bg-stone-300 h-36 md:h-64 w-full mb-2 md:mb-4 border border-stone-300">
          <div className="text-xs flex justify-between h-fit items-center m-5 text-stone-100">
            <p itemProp="category">{product.type}</p>
            <p itemProp="audience" className="text-right">
              {product.animals.map((animal, index) => (
                <span key={animal} itemProp="audience">
                  {animal}
                  {index < product.animals.length - 1 && "，"}
                </span>
              ))}
            </p>
          </div>
        </div>
        <h2 itemProp="name" className="text-md md:text-lg font-semibold">
          {product.name}
        </h2>
        <h3 itemProp="english-name" className="text-xs md:text-sm">
          {product.englishName}
        </h3>

        <meta itemProp="category" content={product.type} />
        {product.animals.map((animal) => (
          <meta key={animal} itemProp="audience" content={animal} />
        ))}
      </article>
    </Link>
  );
}
