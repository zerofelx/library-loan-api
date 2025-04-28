import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { getBooks } from "src/controllers/getBooks";

const router = Router();

export default function getBooksRoute(prisma: PrismaClient) {
    router.get("/get/books", async (req, res) => {
        try {
            const books = await getBooks(prisma);
            res.status(200).json(books);
        } catch (error: any) {
            res.status(500).json({ error: "An internal server error occurred." });
        }
    });

    return router;
}