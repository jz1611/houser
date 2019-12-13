const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res, next) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    const user = await db.check_user_exists(username);
    if(user.length) {
      res.status(400).send("User already exists.");
    }
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdSeller = await db.create_seller([username, hashedPassword]);

    req.session.user = {
      id: createdSeller[0].id,
      username: createdSeller[0].username
    };

    res.status(200).send(req.session.user);
  },

  login: (req, res, next) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    db.check_user_exists(username).then(user => {
      if (!user.length) {
        res.status(400).send("Incorrect username/password.");
      } else {
        bcrypt.compare(password, user[0].password).then(isAuthenticated => {
          if(isAuthenticated) {
            req.session.user = {
              id: user[0].seller_id,
              username: user[0].username
            }
            res.status(200).send(req.session.user);
          } else {
            res.status(400).send("Incorrect username/password.");
          }
        })
      }
    })
  },

  logout: (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
  }
}