const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');


const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith ('Bearer ')){
    throw new customAPIError ('No token provided', 401)
  }
  const token = authHeader.split (' ')[1]
 
  try {
    const decoded = jwt.verify (token, process.env.JWT_SECRET)
 
  } catch (error) {
    throw new CustomAPIError ('Not authorized to access this route', 401)
  }


  next ()
}

module.exports = authenticationMiddleware