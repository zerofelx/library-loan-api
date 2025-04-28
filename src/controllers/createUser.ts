import { PrismaClient } from "@prisma/client";

async function createUser(name: string, email: string, prisma: PrismaClient) {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Create the user
    const user = await prisma.user.create({
        data: {
            name,
            email
        },
    });

    return user;
}

export { createUser };
// This function creates a new user in the database. It first checks if a user with the given email already exists. If not, it creates a new user with the provided name and email. Finally, it returns the created user object.