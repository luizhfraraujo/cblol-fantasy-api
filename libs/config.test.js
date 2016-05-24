module.exports = {
  database: "nodeapi_test",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "nodeapi_test.sqlite",
    logging: false,
    sync: {
      force: true
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: "NODEAPI",
  jwtSession: {session: false}
};
