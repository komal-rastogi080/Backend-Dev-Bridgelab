# API Testing Commands

## Access the Dashboard
Open in browser: http://localhost:3000/dashboard
Or: http://localhost:3000/

## Exercise 1: Filter Books by Author/Year

# Filter by author
curl "http://localhost:3000/api/books?author=Orwell"

# Filter by year
curl "http://localhost:3000/api/books?year=1949"

# Combine filters
curl "http://localhost:3000/api/books?author=Orwell&year=1949"

## Exercise 2: Validation Tests

# Valid year (should work)
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d "{\"title\":\"Test Book\",\"author\":\"Test Author\",\"year\":2024}"

# Invalid year (should fail)
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d "{\"title\":\"Test Book\",\"author\":\"Test Author\",\"year\":1200}"

# Invalid year type (should fail)
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d "{\"title\":\"Test Book\",\"author\":\"Test Author\",\"year\":\"abc\"}"

## Exercise 3: Pagination

# First page, 5 items
curl "http://localhost:3000/api/books?page=1&limit=5"

# Second page, 5 items
curl "http://localhost:3000/api/books?page=2&limit=5"

# Combine with filters
curl "http://localhost:3000/api/books?author=Orwell&page=1&limit=5"

## Exercise 4: Authors CRUD

# Get all authors
curl http://localhost:3000/api/authors

# Get single author
curl http://localhost:3000/api/authors/1

# Create author
curl -X POST http://localhost:3000/api/authors -H "Content-Type: application/json" -d "{\"name\":\"Ernest Hemingway\",\"birthYear\":1899,\"nationality\":\"American\",\"biography\":\"American novelist and short-story writer.\"}"

# Update author (PUT)
curl -X PUT http://localhost:3000/api/authors/5 -H "Content-Type: application/json" -d "{\"name\":\"Ernest Hemingway\",\"birthYear\":1899,\"nationality\":\"American\",\"biography\":\"Updated biography\"}"

# Partial update (PATCH)
curl -X PATCH http://localhost:3000/api/authors/5 -H "Content-Type: application/json" -d "{\"biography\":\"Only updating biography\"}"

# Delete author
curl -X DELETE http://localhost:3000/api/authors/5

## Exercise 5: Search Books

# Search by title
curl "http://localhost:3000/api/books/search?title=gatsby"

# Case insensitive search
curl "http://localhost:3000/api/books/search?title=GATSBY"

# Partial match search
curl "http://localhost:3000/api/books/search?title=the"

## Additional Tests

# Get all books with pagination and filtering
curl "http://localhost:3000/api/books?author=George%20Orwell&page=1&limit=10"

# Filter authors by nationality
curl "http://localhost:3000/api/authors?nationality=American"

# Get single book
curl http://localhost:3000/api/books/1

# Update book
curl -X PUT http://localhost:3000/api/books/1 -H "Content-Type: application/json" -d "{\"title\":\"The Great Gatsby (Updated)\",\"author\":\"F. Scott Fitzgerald\",\"year\":1925}"

# Delete book
curl -X DELETE http://localhost:3000/api/books/1
