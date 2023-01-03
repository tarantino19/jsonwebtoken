const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const CustomAPIError = require('../errors/custom-error');
const customAPIError = require('../errors/custom-error')


const login = async (req, res) => {
  const { username, password } = req.body
    // mongoose validation - schema required
    //Joi
  //check in controller
  if (!username || !password) {
    throw new customAPIError ('Please provide the correct email and password', 400)
  }
  //demo, normally provided by db
  const id = new Date().getDate()

  //in production, use long complex unguessable strings - only put it in the server, never let anyone access this
  const token = jwt.sign({username, id}, process.env.JWT_SECRET, {expiresIn: '30d'})

  res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith ('Bearer ')){
    throw new customAPIError ('No token provided', 401)
  }
  const token = authHeader.split (' ')[1]
 
  try {
    const decoded = jwt.verify (token, process.env.JWT_SECRET)
    const luckyNumber = Math.floor(Math.random () * 100)
    res.status (200).json ({msg: `Hello, ${decoded.username}`, secret: `Here is your lucky number ${luckyNumber}`})

  } catch (error) {
    throw new CustomAPIError ('Not authorized to access this route', 401)
  }

}

module.exports = {
  login, dashboard
}


// Validate username and password

// check username password in (post) login

// if it exist create new JWT

// send back to frontend (not needed in real world - just for example) or we get an error.

// set up authentication so only the request with JWT can access the dashboard - if jwt is present, we can login.

