// Middleware to validate year input
const validateYear = (req, res, next) => {
  const { year } = req.body;
  
  // If year is not provided, skip validation
  if (!year) {
    return next();
  }
  
  // Check if year is a number
  const yearNum = Number(year);
  if (isNaN(yearNum)) {
    return res.status(400).json({ 
      error: 'Year must be a valid number' 
    });
  }
  
  // Check if year is within reasonable range (1450 - current year + 5)
  const currentYear = new Date().getFullYear();
  const MIN_YEAR = 1450; // First printed book
  const MAX_YEAR = currentYear + 5; // Allow future publications
  
  if (yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
    return res.status(400).json({ 
      error: `Year must be between ${MIN_YEAR} and ${MAX_YEAR}` 
    });
  }
  
  // Attach validated year to request
  req.body.year = yearNum;
  next();
};

// Middleware to validate year in query parameters (for filtering)
const validateYearQuery = (req, res, next) => {
  const { year } = req.query;
  
  if (!year) {
    return next();
  }
  
  const yearNum = Number(year);
  if (isNaN(yearNum)) {
    return res.status(400).json({ 
      error: 'Year query parameter must be a valid number' 
    });
  }
  
  const currentYear = new Date().getFullYear();
  const MIN_YEAR = 1450;
  const MAX_YEAR = currentYear + 5;
  
  if (yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
    return res.status(400).json({ 
      error: `Year must be between ${MIN_YEAR} and ${MAX_YEAR}` 
    });
  }
  
  req.query.year = yearNum;
  next();
};

// Middleware to validate pagination parameters
const validatePagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  if (page < 1) {
    return res.status(400).json({ 
      error: 'Page must be greater than or equal to 1' 
    });
  }
  
  if (limit < 1 || limit > 100) {
    return res.status(400).json({ 
      error: 'Limit must be between 1 and 100' 
    });
  }
  
  req.pagination = { page, limit };
  next();
};

module.exports = {
  validateYear,
  validateYearQuery,
  validatePagination
};
