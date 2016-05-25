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
  lane: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
