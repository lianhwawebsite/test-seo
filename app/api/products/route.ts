// app/api/products/route.ts
import { NextResponse } from "next/server";
import data from "@/data.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  
  const filtered = data.products.filter((p) => {
    const matchQuery = p.name.toLowerCase().includes(query) || p.medicineCode.toLowerCase().includes(query);
  return matchQuery;
  });

  return NextResponse.json(filtered.slice(0, 5));
}