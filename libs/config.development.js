import logger from "./logger.js";

module.exports = {
    database: "cblol_fantasy",
    username: "tir4y",
    password: "c3v4d4",
    params: {
        dialect: "mysql",
             host: "STRAWBERRY.arvixe.com",
             logging: (sql) => {
                 logger.info(`[${new Date()}] ${sql}`);
             }
  },
  jwtSecret: "N0d3-4p1$",
  jwtSession: {session: false}
};
