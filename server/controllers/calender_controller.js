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
  const { user_id } = req.headers;

  if (req.user_identifier) {
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
