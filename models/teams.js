module.exports = (sequelize, DataType) => {
  const Teams = sequelize.define("Teams", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
        associate: models => {
          Teams.hasMany(models.Players);
        }
    }
  });
  return Teams;
};
