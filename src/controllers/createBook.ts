import { PrismaClient } from "@prisma/client";

async function addBook(title: string, authorName: string, numberOfCopies: number, prisma: PrismaClient) {
  let author = await prisma.author.findFirst({
    where: {
        name: authorName
    }
  })

  if (!author) {
    author = await prisma.author.create({
      data: {
        name: authorName,
      },
    });
  }

  const book = await prisma.book.create({
    data: {
        title,
        author: {
            connect: {
                id: author.id
            }
        }
    }
  })

  const copiesData = Array(numberOfCopies).fill(0).map(() => ({
    bookId: book.id,
    status: "AVAILABLE"
  }));

  await prisma.copy.createMany({
    data: copiesData
  })

  return prisma.book.findUnique({
    where: {
        id: book.id
    },
    include: {
        author: true,
        copies: true
    }
  })
}

export { addBook };
// This function adds a book to the database. It first checks if the author exists, and if not, it creates a new author. Then, it creates the book and copies associated with it. Finally, it returns the created book with its author and copies included.