import fs from "fs";
import path from "path";
import multipart from "connect-multiparty";

module.exports = app => {
  const Users = app.db.models.Users;
  const apiUrl = app.get("apiUrl");
  var multipartMiddleware = multipart({
      uploadDir: path.join(__dirname,"..", "public/uploads/players")
  });

  app.route(apiUrl + "/user")
    .all(app.auth.authenticate())
    /**
     * @api {get} /user Exibe usuário autenticado
     * @apiGroup Usuario
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email Email
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "John Connor",
     *      "email": "john@connor.net"
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Users.findById(req.user.id, {
        attributes: ["id", "name", "email", "image"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    .put(multipartMiddleware, (req, res) => {
        var file = req.files.file;
        if(file){
            console.log(file);
            var pathArray = file.path.split('\\');
            req.body.image = pathArray[(pathArray.length - 1)];
        }
        console.log(req.body);
        console.log("Meu ID:" + req.body.id);
        Users.update(req.body, {
          where: {
            id: req.body.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    /**
     * @api {delete} /user Exclui usuário autenticado
     * @apiGroup Usuario
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Erro na exclusão
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Users.destroy({where: {id: req.user.id}})
        .then(result => {
          res.sendStatus(204);
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  /**
   * @api {post} /user Cadastra novo usuário
   * @apiGroup Usuario
   * @apiParam {String} name Nome
   * @apiParam {String} email Email
   * @apiParam {String} password Senha
   * @apiParamExample {json} Entrada
   *    {
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
   * @apiSuccess {Number} id Id de registro
   * @apiSuccess {String} name Nome
   * @apiSuccess {String} email Email
   * @apiSuccess {String} password Senha criptografada
   * @apiSuccess {Date} updated_at Data de atualização
   * @apiSuccess {Date} created_at Data de cadastro
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {
   *      "id": 1,
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "$2a$10$SK1B1",
   *      "updated_at": "2015-09-24T15:46:51.778Z",
   *      "created_at": "2015-09-24T15:46:51.778Z"
   *    }
   * @apiErrorExample {json} Erro no cadastro
   *    HTTP/1.1 412 Precondition Failed
   */
   app.post(apiUrl + "/users", (req, res) => {
    Users.create(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
  /*app.post(apiUrl + "/users/upload", multipartMiddleware, (req, res) => {


      Users.update(req.body, {
        where: {
          id: req.params.id
        }
    })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });

      var file = req.files.file;

      console.log(pathArray);
 });*/

};
