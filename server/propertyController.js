module.exports = {
  addProperty: (req, res, next) => {
    const {
      name,
      description,
      address,
      city,
      state,
      zip,
      img_url,
      loan,
      mortgage,
      rent
    } = req.body

    const db = req.app.get('db');
    const { id } = req.session.user;
    db.add_property([name, description, address, city, state, zip, img_url, loan, mortgage, rent, id]);
    db.get_properties(id)
      .then(properties => {
        res.status(200).send(properties);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  },

  getProperties: (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.session.user;
    db.get_properties(id)
      .then(properties => {
        res.status(200).send(properties);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  },

  deleteProperty: (req, res, next) => {
    const db = req.app.get('db')
    const { id } = req.params;
    db.delete_property(id);
    db.get_properties(req.session.user.id)
      .then(properties => {
        res.status(200).send(properties);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
}