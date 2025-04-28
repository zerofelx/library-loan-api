import express, { Application } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { addBook } from './controllers/createBook';

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

addBook('The Great Gatsby', 'F. Scott Fitzgerald', 5, prisma)
  .then((book) => {
    console.log('Book created:', book);
  })
  .catch((error) => {
    console.error('Error creating book:', error);
  })



// Declare the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
})
