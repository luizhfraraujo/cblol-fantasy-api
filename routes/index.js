module.exports = app => {
    const apiUrl = app.get("apiUrl")
  /**
   * @api {get} / API Status
   * @apiGroup Status
   * @apiSuccess {String} status Mensagem de status da API
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {
   *      "status": "NTask API"
   *    }
   */
  app.get(apiUrl + "/", (req, res) => {
    res.json({status: "NTask API"});
  });
};
