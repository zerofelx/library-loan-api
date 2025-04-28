import { PrismaClient } from "@prisma/client";

async function getBooks(prisma: PrismaClient) {
    // Fetch all books from the database
    const books = await prisma.book.findMany({
        include: {
            author: true,
            copies: true
        }
    });
    return books;
}

export { getBooks };
// This function retrieves all books from the database, including their associated copies. It uses Prisma to query the database and returns the list of books.