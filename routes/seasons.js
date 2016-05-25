module.exports = app => {
  const Seasons = app.db.models.Seasons;
  const apiUrl = app.get("apiUrl")

  app.route(apiUrl + "/seasons")
    .all()
    .get((req, res) => {
      Seasons.findAll()
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    
    /*{
    "name": "CBLoL",
    "split": "1",
    "year": "2016"
}*/
    .post((req, res) => {
      Seasons.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });
};
