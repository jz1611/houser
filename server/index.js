require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const massive = require('massive');
const pC = require('./propertyController');
const auth = require('./authController');

const app = express();

app.use(express.json());

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance);
  console.log('Database connected.');
});

// Authorization endpoints
app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.post('/api/auth/logout', auth.logout);

// Property endpoints
app.post('/api/properties', pC.addProperty);
app.get('/api/properties', pC.getProperties);
app.delete('/api/properties/:id', pC.deleteProperty);

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));