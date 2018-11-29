INSERT INTO users
  (email, password, auth_token, user_identifier, email_verified)
VALUES
  ($1, $2, $3, $4, false);

SELECT email, auth_token, user_identifier
FROM users
WHERE user_identifier = $4;