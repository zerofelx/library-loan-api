import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { updateBook } from "src/controllers/updateBook";

const router = Router();

export default function updateBookRoute(prisma: PrismaClient) {
    router.post("/update/book", async (req, res) => {
        const { bookId, title } = req.body;
        
        if(!bookId || !title) {
            res.status(400).json({ error: "Book ID and User ID are required" });
            return
        }

        try {
            const loan = await updateBook(bookId, title, prisma);
            res.status(200).json(loan);
        } catch (error: any) {
            if (error.message === "Book not found") {
                res.status(404).json({ error: "The specified book does not exist." });
            } else {
                res.status(500).json({ error: "An internal server error occurred." });
            }
        }
    })
    
    return router;
}