import express, { Application } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createBook } from './controllers/createBook';
import { lendBook } from './controllers/lendBook';
import { createUser } from './controllers/createUser';
import { getUserLoans } from './controllers/getUserLoans';
import { updateBook } from './controllers/updateBook';
import { returnBook } from './controllers/returnBook';

// Init enviroment variables
dotenv.config();

// Init Prisma Client, the ORM
const prisma = new PrismaClient();

// Init Express App
const app: Application = express();

// Middlewares
app.use(express.json()); // Parse JSON requests

// Routes
app.get('/', async (req, res) => {
  const books = await returnBook(1, 1, prisma);
  res.json(books);
});

// Declare the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})
