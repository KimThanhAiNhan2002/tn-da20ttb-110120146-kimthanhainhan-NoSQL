const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user.role !== 'admin') {
      return res.status(403).send('Access denied');
    }
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
  return next();
};

module.exports = authMiddleware;
