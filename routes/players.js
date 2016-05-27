import Sequelize from "sequelize";
import fs from "fs";
import path from "path";
import multiparty from "multiparty";


module.exports = app => {

  const Players = app.db.models.Players;
  const Teams = app.db.models.Teams;
  const apiUrl = app.get("apiUrl");
  const serverUrl = app.get("serverUrl");

  app.route(apiUrl + "/players")
    .all()
    .get((req, res) => {
      Players.findAll({
          include: [{
              model: Teams,
              where: { id: Sequelize.col('Players.TeamId') }
          }]
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })

    .post((req, res) => {
        req.body.image = "http://localhost:8000/uploads/players/" + req.body.image;
        Players.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
        });
    });

    app.route(apiUrl + "/players/:id")
      .get((req, res) => {
        Players.findOne({
          where: {
            id: req.params.id
        }
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
        Players.update(req.body, {
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
        Players.destroy({
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
