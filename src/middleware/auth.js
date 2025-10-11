const jwt = require('jsonwebtoken'); // standard Node.js library for creating token when user logs in and verifying tokens on protected routes

function auth(req, res, next) {             // define the middleware function
  const hdr = req.headers['authorization'] || '';
  const [scheme, token] = hdr.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ status: false, message: 'Missing or invalid Authorization header' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Invalid or expired token' });
  }
}

module.exports = auth;
