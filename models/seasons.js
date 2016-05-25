module.exports = (sequelize, DataType) => {
  const Seasons = sequelize.define("Seasons", {
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
    },
    year: {
      type: DataType.INTEGER,
      allowNull: false
  },
  split: {
    type: DataType.INTEGER,
    allowNull: false
  }
  }, {
    classMethods: {
        associate: models => {
           Seasons.hasMany(models.Teams);
        }
    }
  });
  return Seasons;
};
