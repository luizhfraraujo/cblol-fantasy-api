module.exports = (sequelize, Sequelize) => {
  const MatchTeamStats = sequelize.define("MatchTeamStats", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gold: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
  },
  wards: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
},
  first_blood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
},
first_tower: {
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
towers: {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true
  }
},
dragons: {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true
  }
},
barons: {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true
  }
}
,
match_number: {
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
          MatchTeamStats.HasMany(models.Players);
        }
    }
  });
  return MatchTeamStats;
};
