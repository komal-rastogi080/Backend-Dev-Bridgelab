const express = require('express');
const router = express.Router();

// Shared data stores (in real app, use a database)
const data = require('../data/store');

// Main dashboard route
router.get('/', (req, res) => {
  const books = data.getBooks();
  const authors = data.getAuthors();
  
  // Calculate statistics
  const stats = {
    totalBooks: books.length,
    totalAuthors: authors.length,
    booksByYear: {},
    authorsByNationality: {}
  };
  
  // Group books by year
  books.forEach(book => {
    stats.booksByYear[book.year] = (stats.booksByYear[book.year] || 0) + 1;
  });
  
  // Group authors by nationality
  authors.forEach(author => {
    const nat = author.nationality || 'Unknown';
    stats.authorsByNationality[nat] = (stats.authorsByNationality[nat] || 0) + 1;
  });
  
  res.render('dashboard', {
    books,
    authors,
    stats
  });
});

module.exports = router;
