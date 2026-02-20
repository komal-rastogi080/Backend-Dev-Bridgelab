# Express REST API - Practice Exercises

A complete Express.js REST API with Books and Authors resources, implementing filtering, pagination, validation, search functionality, and a beautiful EJS Dashboard for data visualization.

## 🌟 Features Overview

### ✅ Exercise 1: Query Parameter Filtering
- Filter books by author: `GET /api/books?author=Orwell`
- Filter books by year: `GET /api/books?year=1949`
- Combine filters: `GET /api/books?author=Orwell&year=1949`

### ✅ Exercise 2: Input Validation Middleware
- Year validation for POST/PUT requests
- Checks if year is a valid number
- Validates year is within reasonable range (1450 - current year + 5)

### ✅ Exercise 3: Pagination
- Add pagination to books: `GET /api/books?page=1&limit=10`
- Default: page=1, limit=10
- Maximum limit: 100

### ✅ Exercise 4: Authors Resource with CRUD
- `GET /api/authors` - Get all authors (with optional nationality filter)
- `GET /api/authors/:id` - Get single author
- `POST /api/authors` - Create new author
- `PUT /api/authors/:id` - Update author
- `PATCH /api/authors/:id` - Partially update author
- `DELETE /api/authors/:id` - Delete author

### ✅ Exercise 5: Search Endpoint
- Search books by title: `GET /api/books/search?title=great`
- Case-insensitive search

### 🎨 NEW: Interactive Dashboard
- Beautiful EJS-based web dashboard at `/dashboard` (also the homepage)
- Real-time statistics display
- Visual data tables for books and authors
- Books by year distribution chart
- Authors by nationality breakdown
- API endpoint reference guide

## 🚀 Installation

```bash
npm install
```

## Running the Server

```bash
# Production mode
npm start

# Development mode (with nodemon)
npm run dev
```

Server runs on: `http://localhost:3000`

## 🎨 Accessing the Dashboard

Once the server is running, open your browser and navigate to:

**Dashboard URL:** `http://localhost:3000/dashboard` (or just `http://localhost:3000/`)

The dashboard provides:
- 📊 Real-time statistics (total books, authors, years, nationalities)
- 📚 Complete books collection table
- ✍️ Complete authors collection table
- 📈 Books by year distribution chart
- 🌍 Authors by nationality breakdown
- 🔌 API endpoints reference guide

## API Endpoints

### Books

#### Get All Books (with filtering & pagination)
```
GET /api/books
GET /api/books?author=Orwell
GET /api/books?year=1949
GET /api/books?page=1&limit=5
GET /api/books?author=Orwell&year=1949&page=1&limit=5
```

#### Search Books by Title
```
GET /api/books/search?title=gatsby
```

#### Get Single Book
```
GET /api/books/:id
```

#### Create Book
```
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
```

#### Update Book
```
PUT /api/books/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2024
}
```

#### Delete Book
```
DELETE /api/books/:id
```

### Authors

#### Get All Authors
```
GET /api/authors
GET /api/authors?nationality=American
```

#### Get Single Author
```
GET /api/authors/:id
```

#### Create Author
```
POST /api/authors
Content-Type: application/json

{
  "name": "Ernest Hemingway",
  "birthYear": 1899,
  "nationality": "American",
  "biography": "American novelist and short-story writer."
}
```

#### Update Author
```
PUT /api/authors/:id
Content-Type: application/json

{
  "name": "Ernest Hemingway",
  "birthYear": 1899,
  "nationality": "American",
  "biography": "Updated biography"
}
```

#### Partially Update Author
```
PATCH /api/authors/:id
Content-Type: application/json

{
  "biography": "Updated biography only"
}
```

#### Delete Author
```
DELETE /api/authors/:id
```

## Testing Examples

### Using curl

```bash
# Get all books
curl http://localhost:3000/api/books

# Filter by author
curl "http://localhost:3000/api/books?author=Orwell"

# Filter by year
curl "http://localhost:3000/api/books?year=1949"

# Pagination
curl "http://localhost:3000/api/books?page=1&limit=5"

# Search books
curl "http://localhost:3000/api/books/search?title=gatsby"

# Create a book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"New Author","year":2024}'

# Get all authors
curl http://localhost:3000/api/authors

# Create an author
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Ernest Hemingway","birthYear":1899,"nationality":"American"}'
```

## 📁 Project Structure

```
Assignment/
├── server.js                 # Main entry point
├── package.json             # Dependencies and scripts
├── data/
│   └── store.js            # Shared data storage (in-memory)
├── middleware/
│   └── validation.js        # Validation middleware
├── routes/
│   ├── books.js            # Books routes & handlers
│   ├── authors.js          # Authors routes & handlers
│   └── dashboard.js        # Dashboard route
├── views/
│   └── dashboard.ejs       # Dashboard EJS template
└── public/
    └── css/
        └── style.css       # Dashboard styles
```

## Validation Rules

### Books
- `title`: Required (string)
- `author`: Required (string)
- `year`: Optional (number, 1450-2031)

### Authors
- `name`: Required (string)
- `birthYear`: Optional (number, 1000-current year)
- `nationality`: Optional (string)
- `biography`: Optional (string)

## Response Formats

### Success Response (Books List)
```json
{
  "page": 1,
  "limit": 10,
  "totalBooks": 10,
  "totalPages": 1,
  "books": [...]
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

## 🛠️ Technologies Used

- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **EJS** - Template engine for the dashboard
- **Nodemon** - Development auto-reload (devDependency)

## 📝 Notes

- Data is stored in-memory using a shared data store (resets on server restart)
- For production, connect to a database (MongoDB, PostgreSQL, etc.)
- Add authentication/authorization for production use
- Consider adding request logging and monitoring
- The dashboard updates in real-time as data changes through API calls
