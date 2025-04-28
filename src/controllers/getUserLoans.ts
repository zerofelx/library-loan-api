import { PrismaClient } from "@prisma/client/extension";

async function getUserLoans(userId: number, prisma: PrismaClient) {
    // Get the user and their loans
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            loans: {
                where: {
                    copy: {
                        status: "LEASED"
                    }
                },
                include: {
                    copy: {
                        include: {
                            book: true
                        }
                    }
                }
            }
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    return user.loans;
}

export { getUserLoans };
// This function retrieves all loans associated with a specific user. It first checks if the user exists in the database. If the user is found, it returns all loans associated with that user, including the book details for each loan. If the user is not found, it throws an error.