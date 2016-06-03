module.exports = (sequelize, Sequelize) => {
  const Players = sequelize.define("Players", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
  },
  lane: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
},
  image: {
    type: Sequelize.STRING,
    allowNull: true
},
  points: {
    type: Sequelize.DECIMAL,
    allowNull: true
},
  price: {
    type: Sequelize.DECIMAL,
    allowNull: true
}
  }, {
    classMethods: {
        associate: models => {
          Players.belongsTo(models.Teams);
          Players.belongsTo(models.MatchTeamStats);
        }
    }
  });
  return Players;
};
