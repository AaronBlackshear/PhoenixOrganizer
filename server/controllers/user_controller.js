const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TokenGenerator = require('uuid-token-generator');

const tokGen = new TokenGenerator();

const createUser = async (req, res) => {
  const db = req.app.get('db')
  // Lowercase the clients email above destructure to keep it a constant
  req.body.email = req.body.email.toLowerCase();
  const { email, password } = req.body
  // Encrypt the users password
  const encryptedPassword = await bcrypt.hash(password, 10)
  // Generate a unique id for the user using their email
  const user_identifier = await bcrypt.hash(email, 10)
  // generate auth_token
  const auth_token = tokGen.generate()

  db
    .create_user([email, encryptedPassword, auth_token, user_identifier])
    .then(user => {
      const token = jwt.sign({ auth_token }, process.env.APP_SECRET);

      // set token as a cookie to authorize user on each request
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 31,
        secure: false,
      })

      // send back user's info
      res.status(200).json({
        username: user[0].username,
        email: user[0].email,
        user_identifier: user[0].user_identifier,
      })
    })
    .catch(err => res.status(500).json(err))
}

const loginUser = (req, res) => {
  const db = req.app.get('db')
  const { username, password } = req.body

  db
    .get_user([ username ])
    .then(async response => {
      if(bcrypt.compareSync(password, response[0].password)) {
        const {
          username,
          email,
          auth_token,
          user_identifier,
        } = response[0];

        const token = jwt.sign({ auth_token }, process.env.APP_SECRET);

        // set token as a cookie to authorize user on each request
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 31,
          secure: false,
        })

        res.status(200).json({
          username,
          email,
          auth_token,
          user_identifier,
        })
      } else {
          res.status(401).json('Invalid Password')
      }
    })
    .catch(err => res.status(500).json(err))
}

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json('Logged Out');
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
}
