import { PrismaClient } from "@prisma/client";

async function returnBook(userId: number, bookId: number, prisma: PrismaClient) {
    // Check if the user exists
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Check if the book exists, this will search on Book table
    // and not on Copy table, because we need to check if the book exists in the database. The copy id is not needed for returning the book.
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        }
    });

    if (!book) {
        throw new Error("Book not found");
    }

    // Get the copy id from the book
    const copy = await prisma.copy.findFirst({
        where: {
            bookId: bookId,
            status: "LEASED" // Check if the copy is leased
        }
    })

    if (!copy) {
        throw new Error("No leased copy found for this book");
    }

    // Find a copy of the book that is currently leased by the user
    const copyLeased = await prisma.loan.findFirst({
        where: {
            userId: userId,
            copyId: copy?.id, // Check if the copy is leased by the user
            returnDate: null // Check if the book is currently leased
        }
    })

    if (!copyLeased) {
        throw new Error("No leased copy found for this user and book");
    }

    // Update the return date of the loan record
    const updatedLoan = await prisma.loan.update({
        where: {
            id: copyLeased.id
        },
        data: {
            returnDate: new Date() // Set the return date to now
        }
    })

    // Update the status of the copy to "AVAILABLE"
    await prisma.copy.update({
        where: {
            id: copyLeased.copyId
        },
        data: {
            status: "AVAILABLE"
        }
    })

    // Return the updated loan record
    return prisma.loan.findUnique({
        where: {
            id: updatedLoan.id
        },
        include: {
            user: true,
            copy: true
        }
    })
}

export { returnBook };
// This function handles the return of a book by a user. It first checks if the user and book exist. Then, it finds a copy of the book that is currently leased by the user. If found, it updates the return date of the loan record and changes the status of the copy to "AVAILABLE". Finally, it returns the updated loan record with user and copy details included.