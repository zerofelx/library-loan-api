import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { deleteBookAndCopies } from "src/controllers/deleteBookAndCopies";

const router = Router();

export default function deleteBooksRoute(prisma: PrismaClient) {
    router.delete("/delete/book", async (req, res) => {
        const { bookId } = req.body;

        if (!bookId) {
            res.status(400).json({ error: "Invalid request body" });
            return;
        }

        try {
            const deletedBook = deleteBookAndCopies(bookId, prisma);
            res.status(200).json(deletedBook);
        } catch (error: any) {
            if (error.message === "Book not found") {
                res.status(404).json({ error: "The specified book does not exist." });
            } else {
                res.status(500).json({ error: "An internal server error occurred." });
            }
        }
    });

    return router;
}