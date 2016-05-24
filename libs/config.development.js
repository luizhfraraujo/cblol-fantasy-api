import logger from "./logger.js";

module.exports = {
    database: "nodeapi",
    username: "",
    password: "",
    params: {
      dialect: "sqlite",
      storage: "nodeapi.sqlite",
      logging: (sql) => {
          logger.info(`[${new Date()}] ${sql}`);
      }
  },
  jwtSecret: "N0d3-4p1$",
  jwtSession: {session: false}
};
