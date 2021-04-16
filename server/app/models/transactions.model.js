module.exports = (sequelize, Sequelize) => {
	const Transactions = sequelize.define('transactions', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		uid: {
			type: Sequelize.INTEGER
		},
		trans_time: {
			type: Sequelize.DATE
		},
		amount: {
			type: Sequelize.DECIMAL(10, 2)
		}
	});
	
	return Transactions;
};