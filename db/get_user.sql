SELECT username, email, auth_token, user_identifier, password
FROM USERS
WHERE email = $1