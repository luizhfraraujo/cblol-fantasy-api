module.exports = (sequelize, Sequelize) => {
  const Teams = sequelize.define("Teams", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      }
  }, {
    classMethods: {
        associate: models => {
          Teams.hasMany(models.Players);
          Teams.hasMany(models.MatchTeamStats);
        }
    }
  });
  return Teams;
};
