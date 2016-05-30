module.exports = app => {
  const Teams = app.db.models.Teams;
  const Players = app.db.models.Players;
  const apiUrl = app.get("apiUrl")

  app.route(apiUrl + "/teams")
    .all()
    .get((req, res) => {
      Teams.findAll()
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })

    .post((req, res) => {
      Teams.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

    app.route(apiUrl + "/teams/:id")
      .get((req, res) => {
        Teams.findOne({
          where: {
            id: req.params.id
        }, include: [
            { model: Players, as: 'Players'}
        ]
        })
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
      })

      .put((req, res) => {
        req.body.image = "http://localhost:8000/uploads/teams/" + req.body.image;
        Teams.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
      })

      .delete((req, res) => {
        Teams.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
      });
};
