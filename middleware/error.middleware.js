// =============================================
// ERROR HANDLING MIDDLEWARE - COMPLETE FIXED
// =============================================

function errorHandler(err, req, res, next) {
  console.error('Error occurred:', {
    message: err.message,
    url: req.originalUrl,
    method: req.method,
    userId: req.session.userId || 'Not logged in'
  });
  
  // Check if it's a static file request (ends with .html, .css, .js, etc.)
const staticFileExtensions = [
  '.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', 
  '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot', 
  '.map', '.json'
];
  
  const isStaticFile = staticFileExtensions.some(function(ext) {
    return req.path.toLowerCase().endsWith(ext);
  });
  
  // Check if it's an API request (check URL contains /api/ or is xhr)
  const isApiRequest = req.xhr || req.path.includes('/api/') || req.path.startsWith('/api');
  
  if (isApiRequest) {
    // API error response - always return JSON
    res.status(500).json({
      success: false,
      message: 'An internal error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  } else if (isStaticFile) {
    // Static file not found - send simple 404
    res.status(404).send('File not found: ' + req.path);
  } else {
    // Page error response - only render if activePage is defined
    res.status(500).render('error/500', {
      title: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      activePage: 'error',
      req: req
    });
  }
}

function notFoundHandler(req, res, next) {
  // Check if it's a static file request
  const staticFileExtensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot'];
  const isStaticFile = staticFileExtensions.some(function(ext) {
    return req.path.toLowerCase().endsWith(ext);
  });
  
  if (req.xhr || req.path.includes('/api/')) {
    res.status(404).json({ success: false, message: 'Resource not found' });
  } else if (isStaticFile) {
    // Static file not found - send simple 404
    res.status(404).send('File not found: ' + req.path);
  } else {
    res.status(404).render('error/404', { 
      title: 'Page Not Found',
      req: req 
    });
  }
}

module.exports = {
  errorHandler,
  notFoundHandler
};