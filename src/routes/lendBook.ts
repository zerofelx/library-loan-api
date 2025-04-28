import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { lendBook } from "src/controllers/lendBook";

const router = Router();

export default function lendBookRoute(prisma: PrismaClient) {
    router.post("/post/lend", async (req, res) => {
        const { bookId, userId } = req.body;
        
        if(!bookId || !userId) {
            res.status(400).json({ error: "Book ID and User ID are required" });
            return
        }

        try {
            const loan = await lendBook(bookId, userId, prisma);
            res.status(200).json(loan);
        } catch (error: any) {
            if (error.message === "Book not found") {
                res.status(404).json({ error: "The specified book does not exist." });
            } else if (error.message === "No available copies for this book") {
                res.status(404).json({ error: "No available copies for the specified book." });
            } else {
                res.status(500).json({ error: "An internal server error occurred." });
            }
        }
    })
    
    return router;
}