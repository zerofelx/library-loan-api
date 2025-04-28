import { PrismaClient } from "@prisma/client/extension";

async function deleteBookAndCopies(bookId: number, prisma: PrismaClient) {
    // Check if the book exists
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        }
    });

    if (!book) {
        throw new Error("Book not found");
    }

    // Delete all copies associated with the book
    await prisma.copy.deleteMany({
        where: {
            bookId: bookId
        }
    });

    // Delete the book itself
    await prisma.book.delete({
        where: {
            id: bookId
        }
    });

    return { message: "Book and its copies deleted successfully" };
}

export { deleteBookAndCopies };
// This function deletes a book and all its associated copies from the database. It first checks if the book exists. If it does, it deletes all copies associated with that book and then deletes the book itself. Finally, it returns a success message.