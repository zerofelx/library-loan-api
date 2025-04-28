import { PrismaClient } from "@prisma/client";

async function createBook(title: string, authorName: string, numberOfCopies: number, prisma: PrismaClient) {
// Check if the author already exists, if not, create a new author. All based on the author's name.
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

  // Create the book and associate it with the author
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

  // Create the specified number of copies for the book and set their status to "AVAILABLE"
  const copiesData = Array(numberOfCopies).fill(0).map(() => ({
    bookId: book.id,
    status: "AVAILABLE"
  }));

  // Create copies in the database
  await prisma.copy.createMany({
    data: copiesData
  })

  // Return the created book with its author and copies included
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

export { createBook };
// This function adds a book to the database. It first checks if the author exists, and if not, it creates a new author. Then, it creates the book and copies associated with it. Finally, it returns the created book with its author and copies included.