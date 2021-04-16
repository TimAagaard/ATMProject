const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
		host: dbConfig.HOST,
		dialect: dbConfig.dialect,
		operatorsAliases: false
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.account = require('./account.model.js')(sequelize, Sequelize);
db.transactions = require('./transactions.model.js')(sequelize, Sequelize);

// Model relationships
db.transactions.belongsTo(db.account);
db.account.hasMany(db.transactions);

module.exports = db;