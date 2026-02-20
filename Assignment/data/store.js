// Shared data storage (in-memory)
// In a real application, this would be a database

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 },
  { id: 6, title: 'Animal Farm', author: 'George Orwell', year: 1945 },
  { id: 7, title: 'Lord of the Flies', author: 'William Golding', year: 1954 },
  { id: 8, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
  { id: 9, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
  { id: 10, title: 'Fahrenheit 451', author: 'Ray Bradbury', year: 1953 }
];

let authors = [
  { 
    id: 1, 
    name: 'F. Scott Fitzgerald', 
    birthYear: 1896, 
    nationality: 'American',
    biography: 'American novelist and short story writer known for depicting the Jazz Age.'
  },
  { 
    id: 2, 
    name: 'Harper Lee', 
    birthYear: 1926, 
    nationality: 'American',
    biography: 'American novelist best known for To Kill a Mockingbird.'
  },
  { 
    id: 3, 
    name: 'George Orwell', 
    birthYear: 1903, 
    nationality: 'British',
    biography: 'English novelist, essayist, and critic, famous for 1984 and Animal Farm.'
  },
  { 
    id: 4, 
    name: 'Jane Austen', 
    birthYear: 1775, 
    nationality: 'British',
    biography: 'English novelist known for romantic fiction set among the landed gentry.'
  }
];

let nextBookId = 11;
let nextAuthorId = 5;

module.exports = {
  // Books methods
  getBooks: () => books,
  getBook: (id) => books.find(b => b.id === id),
  addBook: (book) => {
    const newBook = { id: nextBookId++, ...book };
    books.push(newBook);
    return newBook;
  },
  updateBook: (id, updates) => {
    const book = books.find(b => b.id === id);
    if (book) {
      Object.assign(book, updates);
    }
    return book;
  },
  deleteBook: (id) => {
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
      return books.splice(index, 1)[0];
    }
    return null;
  },
  
  // Authors methods
  getAuthors: () => authors,
  getAuthor: (id) => authors.find(a => a.id === id),
  addAuthor: (author) => {
    const newAuthor = { id: nextAuthorId++, ...author };
    authors.push(newAuthor);
    return newAuthor;
  },
  updateAuthor: (id, updates) => {
    const author = authors.find(a => a.id === id);
    if (author) {
      Object.assign(author, updates);
    }
    return author;
  },
  deleteAuthor: (id) => {
    const index = authors.findIndex(a => a.id === id);
    if (index !== -1) {
      return authors.splice(index, 1)[0];
    }
    return null;
  }
};
