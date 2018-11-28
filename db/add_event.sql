INSERT INTO events
  (user_id, event_body, category, event_date, start_time, end_time)
VALUES($1, $2, $3, $4, $5, $6);

SELECT *
FROM events
WHERE user_id = $1