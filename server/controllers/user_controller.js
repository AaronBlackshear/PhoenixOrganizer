const loginUser = (req, res) => {
  const db = req.app.get('db')
  const { username, password } = req.body
  db
    .get_user([ username, password ])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err))
}

module.exports = {
  loginUser
}
