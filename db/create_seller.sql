INSERT INTO sellers (username, password)
VALUES ($1, $2)
RETURNING *;