
const jwt = require('jsonwebtoken')
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
  const id = newDate().getDate()

  //in production, use long complex unguessable strings - only put it in the server, never let anyone access this
  const token = jwt.sign({username, id}, process.env.SECRET, {expiresIn: 60*60})

  res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random () * 100)
  res.status (200).json ({msg: `Hello, John Doe`, secret: `Here is your lucky number ${luckyNumber}`})
}

module.exports = {
  login, dashboard
}


// Validate username and password

// check username password in (post) login

// if it exist create new JWT

// send back to frontend (not needed in real world - just for example) or we get an error.

// set up authentication so only the request with JWT can access the dashboard - if jwt is present, we can login.

