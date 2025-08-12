"use client";
import Script from "next/script";

export function SeoHead({ schema }: { schema: object | object[] }) {
  const list = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {list.map((obj, i) => (
        <Script key={i} id={`ldjson-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
    </>
  );
}