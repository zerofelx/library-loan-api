import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import getUserLoansRoute from "./getUserLoans";
import createBookRoute from "./createBook";
import createUserRoute from "./createUser";
import getBooksRoute from "./getBooks";
import deleteBooksRoute from "./deleteBooks";
import lendBookRoute from "./lendBook";
import returnBookRoute from "./returnBook";
import updateBookRoute from "./updateBook";

export default function registerRoutes(prisma: PrismaClient) {
    const router = Router();

    router.use(createBookRoute(prisma));
    router.use(createUserRoute(prisma));

    router.use(getBooksRoute(prisma));
    router.use(getUserLoansRoute(prisma));

    router.use(updateBookRoute(prisma));
    router.use(lendBookRoute(prisma));
    router.use(returnBookRoute(prisma))

    router.use(deleteBooksRoute(prisma));

    return router;
}