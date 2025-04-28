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

## Decisiones de Diseño

### Modelado de Database
- **Copy Table**: En lugar de simplemente registrar el número de libros, utilizamos una entidad de copia para registrar ejemplares individuales. Esto permite un mejor control del estado de cada ejemplar físico y su historial de préstamos.

### Relaciones
- **Author-Book**: Relación de uno a muchos que permite a un autor tener varios libros manteniendo la integridad de los datos.
- **Book-Copy**: Relación de uno a muchos que permite el seguimiento de múltiples copias por título de libro.
- **Copy-Loan**: Relación de uno a muchos que garantiza que cada copia pueda tener un historial de préstamos.

### Negocio
- El identificador único de libro físico es un ID en la tabla Copy, solo un int incremental, pero se podría añadir una columna como identificador único con el Barcode único del libro físico y en un futuro implementar un lector de codigos de barras en el frontend.
- Un usuario puede tener varios prestamos de libros pero las copias físicas solo pueden ser prestados una vez antes de ser regresados
- Existen tres columnas con respecto al préstamo: loanDate (Día que fue prestado), dueDate (Día que debe de regresarse el libro) y returnDate (Este es opcional, si está vacío es que aún no ha sido regresado el libro, cuando tenga una fecha esta indicará cuando se regresó el libro). Se hizo de esta manera para tener posibilidad de en un futuro hacer tracking de las copias no regresadas con los tiempos de prestamo, día que debería de regresarse y calcular el tiempo de mora.

### Decisiones Técnicas
- **Prisma ORM**: Elegí Prisma por su fácil implementación con Typescript
- **Express.js**: Decidí utilizarlo porque es simple de implementar y es con el que tengo experiencia
- **Commits and Comments on English**: Pese a que mi idioma natal es el Español tengo como regla personal el hacer todos los comentarios tanto en el código como en los commits en inglés. De la misma forma intento mantener todo el código siempre en inglés para facilitar la implementación en cualquier lugar del mundo.

### Entorno de Trabajo
- **VSCode**: Utilizo VSCode como editor de código junto a las extenciones respectivas para el linting de Prisma y Typescript
- **Git**: Utilizo Git como sistema de control de versiones, con un repositorio público en GitHub y un repositorio privado en mi GitLab privado en mi hogar. Siempre mantengo un control de cada desarrollo con Git.
- **Insomnia**: Utilizo Insomnia, en algunos otros casos Postman, para probar los endpoints. Es una herramienta escencial en mi flujo de trabajo para el desarrollo de APIs.
- **Hostinger MySQL**: Para evitar ralentizar mi computador de trabajo prefiero utilizar Databases remotas, utilizo mi plan de Hostinger para montar databases, configurarlas para acceso remoto y utilizarlas en mis proyectos.

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
- **POST** `/api/update/book`
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

### Loans
- **GET** `/api/get/loans`
  ```json
  {
    "userId": 1
  }
  ```
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