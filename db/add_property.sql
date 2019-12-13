INSERT INTO properties (name, description, address, city, state, zip, img_url, loan, mortgage, rent, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
-- SELECT * FROM properties WHERE user_id = $11;