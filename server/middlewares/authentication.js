const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  });
}

// Authorization middleware for sellers
const authorizeSeller = (req, res, next) => {
  if (req.user && req.user.role === 'seller') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized. Only sellers are allowed.' });
  }
}

// Authorization middleware for buyers
const authorizeBuyer = (req, res, next) => {
  if (req.user && req.user.role === 'buyer') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized. Only buyers are allowed.' });
  }
}

module.exports = {
  authorizeBuyer,
  authorizeSeller,
  authenticateToken,
}