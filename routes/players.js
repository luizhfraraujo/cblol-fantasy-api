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
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            console.log(files);
        });

        var newPlayer = req.body;
        console.log(req.body, req.files);
        /*if(newPlayer.image) {
            fs.readFile(req.files.image.path, function (err, data) {
                var imageName = req.files.image.name;
                newPlayer.image = serverUrl + "/uploads/players/" + newPlayer.image;
                var fsPathImage = path.join(__dirname, '..', 'public/uploads/players/') + newPlayer.image;
                fs.writeFile(fsPathImage, data, function (err) {
                    if(err){
                            console.log(err);
                    }
                });
            });
        }*/

            /*var fsPathImage = path.join(__dirname, '..', 'public/uploads/players/') + newPlayer.image;
            newPlayer.image = serverUrl + "/uploads/players/" + newPlayer.image;
            fs.writeFile(fsPathImage, function (err)
            {
                if(err){
                        console.log(err);
                }
            });*/
        Players.create(newPlayer)
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
