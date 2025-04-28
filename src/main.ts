import express, { Application } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { addBook } from './controllers/createBook';
import { lendBook } from './controllers/lendBook';
import { createUser } from './controllers/createUser';

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
  const books = await prisma.book.findMany();
  res.json(books);
});

lendBook(2, 1, prisma)
.then((book) => {
  console.log(book);

})
.catch((error) => {
  console.error("Error lending book:", error);
});


// Declare the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
})
