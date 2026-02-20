const express = require('express');
const router = express.Router();
const store = require('../data/store');

// Exercise 4: GET all authors
router.get('/', (req, res) => {
  // Optional filtering by nationality
  const authors = store.getAuthors();
  let filteredAuthors = [...authors];
  
  if (req.query.nationality) {
    const nationalitySearch = req.query.nationality.toLowerCase();
    filteredAuthors = filteredAuthors.filter(author => 
      author.nationality.toLowerCase().includes(nationalitySearch)
    );
  }
  
  res.json({
    count: filteredAuthors.length,
    authors: filteredAuthors
  });
});

// Exercise 4: GET single author by ID
router.get('/:id', (req, res) => {
  const author = store.getAuthor(parseInt(req.params.id));
  
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  
  res.json(author);
});

// Exercise 4: POST - Create a new author
router.post('/', (req, res) => {
  const { name, birthYear, nationality, biography } = req.body;
  
  // Validation
  if (!name) {
    return res.status(400).json({ 
      error: 'Name is required' 
    });
  }
  
  // Validate birthYear if provided
  if (birthYear) {
    const year = Number(birthYear);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      return res.status(400).json({ 
        error: 'Birth year must be a valid year' 
      });
    }
  }
  
  const newAuthor = store.addAuthor({
    name,
    birthYear: birthYear ? Number(birthYear) : null,
    nationality: nationality || 'Unknown',
    biography: biography || ''
  });
  
  res.status(201).json(newAuthor);
});

// Exercise 4: PUT - Update an author
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const author = store.getAuthor(id);
  
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  
  const { name, birthYear, nationality, biography } = req.body;
  
  // Validate birthYear if provided
  if (birthYear !== undefined) {
    const year = Number(birthYear);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      return res.status(400).json({ 
        error: 'Birth year must be a valid year' 
      });
    }
    author.birthYear = year;
  }
  
  if (name) author.name = name;
  if (nationality) author.nationality = nationality;
  if (biography !== undefined) author.biography = biography;
  
  store.updateAuthor(id, author);
  res.json(author);
});

// Exercise 4: PATCH - Partially update an author
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const author = store.getAuthor(id);
  
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  
  const { name, birthYear, nationality, biography } = req.body;
  
  // Validate birthYear if provided
  if (birthYear !== undefined) {
    const year = Number(birthYear);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      return res.status(400).json({ 
        error: 'Birth year must be a valid year' 
      });
    }
    author.birthYear = year;
  }
  
  if (name !== undefined) author.name = name;
  if (nationality !== undefined) author.nationality = nationality;
  if (biography !== undefined) author.biography = biography;
  
  store.updateAuthor(id, author);
  res.json(author);
});

// Exercise 4: DELETE an author
router.delete('/:id', (req, res) => {
  const deletedAuthor = store.deleteAuthor(parseInt(req.params.id));
  
  if (!deletedAuthor) {
    return res.status(404).json({ error: 'Author not found' });
  }
  
  res.json({ 
    message: 'Author deleted successfully', 
    author: deletedAuthor 
  });
});

module.exports = router;
