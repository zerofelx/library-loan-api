import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { returnBook } from "src/controllers/returnBook";

const router = Router();

export default function returnBookRoute(prisma: PrismaClient) {
    router.post("/post/return", async (req, res) => {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            res.status(400).json({ error: "Invalid request body" });
            return;
        }

        try {
            const updatedLoan = await returnBook(userId, bookId, prisma);
            res.status(200).json(updatedLoan);
        } catch (error: any) {
            if (error.message === "User not found") {
                res.status(404).json({ error: "The specified user does not exist." });
            } else if (error.message === "Book not found") {
                res.status(404).json({ error: "The specified book does not exist." });
            } else if (error.message === "No leased copy found for this user and book") {
                res.status(400).json({ error: "No leased copy found for this user and book." });
            } else {
                res.status(500).json({ error: "An internal server error occurred." });
            }
        }
    });

    return router;
}
