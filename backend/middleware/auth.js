import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Log the decoded token for debugging
    console.log('Decoded token:', decoded);
    
    // Ensure we're using the correct field from the token
    req.user = {
      id: decoded.userId || decoded.id, // Try both userId and id
      role: decoded.role
    };
    
    // Log the user object for debugging
    console.log('User object:', req.user);
    
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth; 