import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createUser } from "src/controllers/createUser";

const router = Router();

export default function createUserRoute(prisma: PrismaClient) {
    router.post("/create/user", async (req, res) => {
        const { name, email } = req.body;

        if(!name || !email) {
            res.status(400).json({ error: "Invalid request body"})
            return
        }

        try {
            const user = await createUser(name, email, prisma);
            res.status(201).json(user);
        } catch (error: any) {
            if (error.message == "User already exists") {
                res.status(409).json({ error: "User already exists" });
            } else {
                res.status(500).json({ error: "An internal server error occurred." });
            }
        }
    });

    return router;
}