import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createBook } from "../controllers/createBook";

const router = Router();

export default function createBookRoute(prisma: PrismaClient) {
    router.post("/create/book", async (req, res) => {
        const { title, author, copies } = req.body;

        if(!title || !author || typeof copies !== "number" || copies <= 0) {
            res.status(400).json({ error: "Invalid request body"})
            return
        }

        try {
            const book = await createBook(title, author, copies, prisma);
            res.status(201).json(book);
        } catch (error: any) {
            res.status(500).json({ error: "An internal server error occurred." });
        }
    });

    return router;
}