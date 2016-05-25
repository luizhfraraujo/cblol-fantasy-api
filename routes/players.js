module.exports = app => {
  const Players = app.db.models.Players;
  const apiUrl = app.get("apiUrl")

  app.route(apiUrl + "/players")
    .all()
    .get((req, res) => {
      Players.findAll()
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
};
