import { PrismaClient } from "@prisma/client/extension";

async function lendBook(bookId: number, userId: number, prisma: PrismaClient) {
    // Check if the book exists and it's available
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        },
        include: {
            copies: true
        }
    })

    if (!book) {
        throw new Error("Book not found");
    }

    // Check the first available copy
    const availableCopy = book.copies.find((copy: any) => copy.status === "AVAILABLE");

    if(!availableCopy) {
        throw new Error("No available copies for this book");
    }

    // Update the copy status to "Leased"
    await prisma.copy.update({
        where: {
            id: availableCopy.id
        },
        data: {
            status: "LEASED"
        }
    })

    // Create a new loan record associated with the user
    const loan = await prisma.loan.create({
        data: {
            userId,
            copyId: availableCopy.id,
            loanDate: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Set due date to one week from now
        }
    })

    // Return the loan data
    return prisma.loan.findUnique({
        where: {
            id: loan.id
        },
        include: {
            user: true,
            copy: {
                include: {
                    book: true
                }
            }
        }
    })
}

export { lendBook };
// This function is responsible for lending a book to a user. It checks if the book exists and if there are available copies. If so, it updates the status of the copy to "LENT" and associates it with the user. Finally, it returns the updated copy information.