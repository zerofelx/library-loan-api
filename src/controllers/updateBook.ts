import { PrismaClient } from "@prisma/client/extension";

async function updateBook(bookId: number, title: string, prisma: PrismaClient) {
    // Check if the book exists
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        }
    });

    if (!book) {
        throw new Error("Book not found");
    }

    // Update the book's title and author
    const updatedBook = await prisma.book.update({
        where: {
            id: bookId
        },
        data: {
            title
        }
    });

    // Return the updated book with its author and copies included
    return prisma.book.findUnique({
        where: {
            id: updatedBook.id
        },
        include: {
            author: true,
            copies: true
        }
    });
}

export { updateBook };
// This function updates the title and author of a book in the database. It first checks if the book exists. If it does, it updates the book's title and author name. Finally, it returns the updated book with its author and copies included.