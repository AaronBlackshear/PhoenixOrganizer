const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TokenGenerator = require('uuid-token-generator');

const tokGen = new TokenGenerator();

const createUser = async (req, res) => {
  const db = req.app.get('db')
  const { email, password } = req.body
  const encryptedPassword = await bcrypt.hash(password, 10)
  let userIdExists = false;
  let user_identifier;

  const generateToken = response => {
    const uniqueToken = tokGen.generate();
    response.forEach(obj => {
      if (obj.user_identifier === uniqueToken) userIdExists = true
    })

    if (userIdExists) {
      generateToken()
    }
    user_identifier = uniqueToken;
  }

  db
    .check_user_id()
    .then(response => {
      generateToken(response)
      const token = jwt.sign({ userId: response.user_identifier }, process.env.APP_SECRET)

      db
        .create_user([email, encryptedPassword, token, user_identifier])
        .then(response => {
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 31,
          })
    
          res.status(200).json(response)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const loginUser = (req, res) => {
  const db = req.app.get('db')
  const { username, password } = req.body

  db
    .get_user([ username ])
    .then(async response => {
      if(bcrypt.compareSync(password, response[0].password)) {
        res.status(200).json({
          username: response[0].username,
          email: response[0].email,
          auth_token: response[0].auth_token,
          user_identifier: response[0].user_identifier,
        })
      } else {
          res.status(401).json('Invalid Password')
      }
    })
    .catch(err => res.status(500).json(err))
}

module.exports = {
  createUser,
  loginUser
}
