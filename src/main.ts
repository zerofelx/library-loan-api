import express, { Application } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import registerRoutes from './routes';

// Init enviroment variables
dotenv.config();

// Init Prisma Client, the ORM
const prisma = new PrismaClient();

// Init Express App
const app: Application = express();

// Middlewares
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api", registerRoutes(prisma)); // Register API routes

// Declare the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})
