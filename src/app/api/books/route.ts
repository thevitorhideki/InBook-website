import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const books = await prisma.book.findMany();

  return new Response(JSON.stringify(books));
}

export async function POST(req: Request) {
  const body = await req.json();
  const newBook = await prisma.book.create({
    data: {
      title: body.title,
      author: body.author,
      slug: body.slug,
    },
  });

  return new Response(JSON.stringify(newBook));
}
