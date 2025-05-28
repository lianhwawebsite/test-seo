import data from "@/data.json";

export default async function Table({ query }: { query: string; }) {
  const keyword = query?.toLowerCase() ?? "";
  const filteredData = data?.products.filter((item) => item.name.toLowerCase().includes(keyword) || item.animals.includes(keyword) || item.type.includes(keyword));
  
    return (
      <>
        {filteredData.map((product) => (
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
      </>
    );
}
