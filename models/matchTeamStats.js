module.exports = (sequelize, Sequelize) => {
  const MatchTeamStats = sequelize.define("MatchTeamStats", {
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
  first_blood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
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
          MatchTeamStats.belongsTo(models.Teams);
          MatchTeamStats.belongsTo(models.Matchs);
        }
    }
  });
  return MatchTeamStats;
};
