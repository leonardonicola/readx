import { type NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search");
  if (!search) {
    return NextResponse.json({
      error: "Busca inválida!",
      result: []
    });
  }
  try {
    const books = await prisma.book.findMany({
      where: { title: { mode: "insensitive", contains: search } },
      take: 30,
      select: { title: true, id: true, author: true }
    });
    return NextResponse.json({
      error: null,
      result: books
    });
  } catch (error) {
    return NextResponse.json({
      error: "Não foi possível encontrar",
      result: []
    });
  }
}
