module.exports = (sequelize, Sequelize) => {
	const Account = sequelize.define('account', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
		},
		balance: {
			type: Sequelize.DECIMAL(10, 2)
		}
	});
	
	return Account;
};