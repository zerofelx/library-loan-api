# Library Loan API

A backend API for managing university book loans built with Express.js, TypeScript, and Prisma ORM.

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure your environment variables:
Create a `.env` file with:
```
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
PORT=3000
```

4. Initialize the database:
```bash
npm run prisma:push
npm run prisma:generate
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Books
- **GET** `/api/get/books` - Get all books
- **POST** `/api/create/book`
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "copies": 3
  }
  ```
- **POST** `/api/post/lend`
  ```json
  {
    "bookId": 1,
    "title": "Updated Title"
  }
  ```
- **DELETE** `/api/delete/book`
  ```json
  {
    "bookId": 1
  }
  ```

### Users
- **POST** `/api/create/user`
  ```json
  {
    "name": "User Name",
    "email": "user@example.com"
  }
  ```
- **GET** `/api/get/loans`
  ```json
  {
    "userId": 1
  }
  ```

### Loans
- **POST** `/api/post/lend`
  ```json
  {
    "bookId": 1,
    "userId": 1
  }
  ```
- **POST** `/api/post/return`
  ```json
  {
    "userId": 1,
    "loanId": 1
  }
  ```

## Database Schema

### Book
- `id`: Int (Primary Key)
- `title`: String
- `authorId`: Int
- `copies`: Copy[]

### Author
- `id`: Int (Primary Key)
- `name`: String
- `books`: Book[]

### Copy
- `id`: Int (Primary Key)
- `bookId`: Int
- `status`: String
- `loans`: Loan[]

### User
- `id`: Int (Primary Key)
- `name`: String
- `email`: String (Unique)
- `loans`: Loan[]

### Loan
- `id`: Int (Primary Key)
- `userId`: Int
- `copyId`: Int
- `loanDate`: DateTime
- `dueDate`: DateTime
- `returnDate`: DateTime?

## Controllers

- **createBook**: Creates a new book with specified copies
- **createUser**: Creates a new user account
- **deleteBookAndCopies**: Removes a book and its copies
- **getBooks**: Retrieves all books with author and copy info
- **getUserLoans**: Gets all loans for a specific user
- **lendBook**: Processes book lending to users
- **returnBook**: Handles book returns
- **updateBook**: Updates book information