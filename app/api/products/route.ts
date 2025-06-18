// app/api/products/route.ts
import { NextResponse } from "next/server";
import data from "@/data.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filtered = data.products.filter((p) => p.name.toLowerCase().includes(query));

  return NextResponse.json(filtered.slice(0, 5));
}