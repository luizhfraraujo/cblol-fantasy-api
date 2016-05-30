import Sequelize from "sequelize";

module.exports = app => {
  const MatchTeamStats = app.db.models.MatchTeamStats;
  const Matchs = app.db.models.Matchs;
  const Teams = app.db.models.Teams;
  const MatchPlayerStats = app.db.models.MatchPlayerStats;
  const apiUrl = app.get("apiUrl")

  app.route(apiUrl + "/matchs")
    .all()
    .get((req, res) => {
      Matchs.findAll()
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })

    .post((req, res) => {
      Matchs.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

    app.route(apiUrl + "/matchs/:id")
      .get((req, res) => {
        Matchs.findOne({
          where: {
            id: req.params.id
        }, include: [
            { model: MatchTeamStats, as: 'MatchTeamStats'},
            { model: MatchPlayerStats, as: 'MatchPlayerStats'}
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
        Matchs.update(req.body, {
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
        Matchs.destroy({
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
