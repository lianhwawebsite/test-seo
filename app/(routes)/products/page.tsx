import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import data from "@/data.json";

export function generateMetadata() {
  const lang = "zh-TW";
  return getMetadata(lang, "products");
}

export default async function Page({ searchParams }: { searchParams: { q?: string } }) {
  const schema = getSchema("products");
  const { q } = await searchParams;
  const keyword = q?.toLowerCase() ?? "";
  const filteredData = data.products.filter((item) => item.name.toLowerCase().includes(keyword) || item.animals.includes(keyword) || item.type.includes(keyword));

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <h1 className="text-xl">產品介紹（Products）</h1>
      <form className="my-10" action="/products" method="GET" role="search">
        <label htmlFor="search" className="sr-only">
          搜尋藥品
        </label>
        <input type="search" id="search" name="q" placeholder="搜尋藥品..." className="border px-4 py-2 rounded-full w-42 md:w-64 focus:outline-0" />
        <button type="submit" className="ml-2 px-4 py-2 border rounded-full">
          搜尋
        </button>
      </form>
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filteredData?.map((product) => (
          <article key={product.id} className="border rounded-xl p-4 shadow" itemScope itemType="https://schema.org/Product">
            <h2 itemProp="name" className="text-lg font-semibold">
              <a href={`/products/${product.id}`} itemProp="url">
                {product.name}
              </a>
            </h2>
            <p itemProp="category">{product.type}</p>
            <p itemProp="audience">
              {product.animals.map((animal, index) => (
                <span key={animal} itemProp="audience">
                  {animal}
                  {index < product.animals.length - 1 && "，"}
                </span>
              ))}
            </p>
            <meta itemProp="category" content={product.type} />
            {product.animals.map((animal) => (
              <meta key={animal} itemProp="audience" content={animal} />
            ))}
          </article>
        ))}
      </section>
    </>
  );
}
