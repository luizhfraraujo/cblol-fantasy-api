module.exports = (sequelize, Sequelize) => {
  const Matchs = sequelize.define("Matchs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    team1: {
      type: Sequelize.INTEGER
    },
    team2: {
      type: Sequelize.INTEGER
    },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: true
},
  time: {
    type: Sequelize.TIME,
    allowNull: true
},
type: {
  type: Sequelize.STRING,
  allowNull: false,
  validate: {
    notEmpty: true
  }
}
  }, {
    classMethods: {
        associate: models => {
        Matchs.hasMany(models.MatchTeamStats);
        Matchs.hasMany(models.MatchPlayerStats);
    }
    }
  });
  return Matchs;
};
