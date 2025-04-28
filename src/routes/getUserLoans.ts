import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserLoans } from "src/controllers/getUserLoans";

const router = Router();

export default function getUserLoansRoute(prisma: PrismaClient) {
    router.get("/get/loans", async (req, res) => {
        const { userId } = req.body;
        try {
            const loans = await getUserLoans(userId, prisma);
            res.status(200).json(loans);
        } catch (error: any) {
            if (error.message === "Book not found") {
                res.status(404).json({ error: "The specified book does not exist." });
            } else if (error.message === "No available copies for this book") {
                res.status(404).json({ error: "No available copies for the specified book." });
            } else {
                res.status(500).json({ error: "An internal server error occurred." });
            }
        }
    });

    return router;
}