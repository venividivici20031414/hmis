const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token sent in Authorization header.
 * On success, attaches decoded token payload to req.user.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // e.g., { userId, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

/**
 * Middleware factory to restrict access based on user roles.
 * Usage: authorizeRoles('Admin', 'Doctor')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log('authorizeRoles: Missing req.user');
      return res.status(401).json({ message: 'Unauthorized: User info missing' });
    }

    console.log('authorizeRoles: User role:', req.user.role);
    console.log('authorizeRoles: Allowed roles:', allowedRoles);

    if (!allowedRoles.includes(req.user.role)) {
      console.log('authorizeRoles: Forbidden - insufficient privileges');
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRoles,
};
