const checkUser = async (req, authToken) => {
  const db = req.app.get('db');
  const { email, password } = req.headers;
  let user;

  await db
    .check_user([authToken])
    .then(res => user = res[0])
    .catch(err => console.log("ERROR: ", err));

  if (user.email === email && user.password === password && user.auth_token_one === authToken) {
    return user
  }
  return null;
}

const getEvents = (req, res) => {
  const db = req.app.get('db');
  const { userid } = req.headers;

  db
    .get_events([userid])
    .then(response => res.status(200).json(response))
    .catch(err => {
      throw new Error(err);
    });
}

const addEvent = async (req, res) => {
  const db = req.app.get('db');
  const { event, category, date, startTime, endTime } = req.body;
  const { authtoken, user_id } = req.headers;
  let currentUser = await checkUser(req, authtoken);

  if (req.session.cookie && currentUser) {
    db
      .add_event([user_id, event, category, date, startTime, endTime])
      .then(response => res.status(200).json(response))
      .catch(err => {
        throw new Error(err);
      });
  }
};

const getCategories = (req, res) => {
  const db = req.app.get('db');
  const { user_id } = req.headers;

  db
    .get_categories([user_id])
    .then(response => res.status(200).json(response))
    .catch(err => {
      throw new Error(err)
    })
};

module.exports = {
  getEvents,
  addEvent,
  getCategories,
}
