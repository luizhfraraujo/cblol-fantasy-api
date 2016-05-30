module.exports = (sequelize, Sequelize) => {
  const MatchPlayerStats = sequelize.define("MatchPlayerStats", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    creeps: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
  },
  kills: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
},
deaths: {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true
  }
},
assists: {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true
  }
}
  }, {
    classMethods: {
        associate: models => {
          MatchPlayerStats.belongsTo(models.Players);
          MatchPlayerStats.belongsTo(models.Matchs);
        }
    }
  });
  return MatchPlayerStats;
};
