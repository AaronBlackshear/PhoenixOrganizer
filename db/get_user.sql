SELECT *
FROM USERS
WHERE email = $1
  AND password = $2