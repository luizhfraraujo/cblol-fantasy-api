module.exports = (sequelize, DataType) => {
  const Players = sequelize.define("Players", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
        associate: models => {
          Players.belongsTo(models.Teams);
        }
    }
  });
  return Players;
};
