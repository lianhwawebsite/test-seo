"use client";
import Head from "next/head";

type Props = {
  schema?: object | null;
};

export function SeoHead({ schema }: Props) {
  if (!schema) return null;
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </Head>
  );
}