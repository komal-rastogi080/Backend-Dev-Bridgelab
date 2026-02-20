const express = require('express');
const router = express.Router();
const { validateYear, validateYearQuery, validatePagination } = require('../middleware/validation');
const store = require('../data/store');

// Exercise 5: Search endpoint - Search books by title
router.get('/search', (req, res) => {
  const { title } = req.query;
  
  if (!title) {
    return res.status(400).json({ 
      error: 'Title query parameter is required' 
    });
  }
  
  // Case-insensitive search
  const searchTerm = title.toLowerCase();
  const books = store.getBooks();
  const results = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm)
  );
  
  res.json({
    count: results.length,
    searchTerm: title,
    results
  });
});

// Exercise 1 & 3: GET all books with filtering and pagination
router.get('/', validateYearQuery, validatePagination, (req, res) => {
  const books = store.getBooks();
  let filteredBooks = [...books];
  
  // Exercise 1: Filter by author
  if (req.query.author) {
    const authorSearch = req.query.author.toLowerCase();
    filteredBooks = filteredBooks.filter(book => 
      book.author.toLowerCase().includes(authorSearch)
    );
  }
  
  // Exercise 1: Filter by year
  if (req.query.year) {
    filteredBooks = filteredBooks.filter(book => 
      book.year === req.query.year
    );
  }
  
  // Exercise 3: Pagination
  const { page, limit } = req.pagination;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  
  res.json({
    page,
    limit,
    totalBooks: filteredBooks.length,
    totalPages: Math.ceil(filteredBooks.length / limit),
    books: paginatedBooks
  });
});

// GET single book by ID
router.get('/:id', (req, res) => {
  const book = store.getBook(parseInt(req.params.id));
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});

// POST - Create a new book (with Exercise 2: validation)
router.post('/', validateYear, (req, res) => {
  const { title, author, year } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ 
      error: 'Title and author are required' 
    });
  }
  
  const newBook = store.addBook({
    title,
    author,
    year: year || new Date().getFullYear()
  });
  
  res.status(201).json(newBook);
});

// PUT - Update a book (with Exercise 2: validation)
router.put('/:id', validateYear, (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, year } = req.body;
  
  const updates = {};
  if (title) updates.title = title;
  if (author) updates.author = author;
  if (year) updates.year = year;
  
  const book = store.updateBook(id, updates);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});

// DELETE a book
router.delete('/:id', (req, res) => {
  const deletedBook = store.deleteBook(parseInt(req.params.id));
  
  if (!deletedBook) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json({ 
    message: 'Book deleted successfully', 
    book: deletedBook 
  });
});

module.exports = router;
