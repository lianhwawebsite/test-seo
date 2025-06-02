import data from "@/data.json";

export default async function Table({ query, selectedAnimals, selectedTypes, page }: { query: string; selectedAnimals: string[]; selectedTypes: string[]; page?: number }) {
  
  
  const filteredData = data?.products.filter((item) => {
    const matchQuery = !query || item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query);

    const matchAnimals = selectedAnimals.length === 0 || selectedAnimals.some((a) => item.animals.includes(a));

    const matchTypes = selectedTypes.length === 0 || selectedTypes.some((t) => item.type.includes(t));

    return matchQuery && matchAnimals && matchTypes;
  });

    // const pageSize = 10;
    // const totalResults = filteredData.length;
    // const totalPages = Math.ceil(totalResults / pageSize);
    // const pagedResults = filteredData.slice((page - 1) * pageSize, page * pageSize);

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
