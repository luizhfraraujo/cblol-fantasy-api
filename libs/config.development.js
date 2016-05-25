import logger from "./logger.js";

module.exports = {
    database: "cblolfantasy",
    username: "",
    password: "",
    params: {
      dialect: "sqlite",
      storage: "cblolfantasy.sqlite",
      logging: (sql) => {
          logger.info(`[${new Date()}] ${sql}`);
      }
  },
  jwtSecret: "N0d3-4p1$",
  jwtSession: {session: false}
};
