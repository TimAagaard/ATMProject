const db = require('../models');
const Account = db.account;
const Transactions = db.transactions;
const Op = db.Sequelize.Op;

// Get a single account by ID
exports.getByID = (req, res) => {
	const id = req.params.id;
	
	Account.findByPk(id).then(data => {
		if(data)
		{
			res.send(data);
		}
		res.send(404).send({
			message: 'Error: Account not found'
		});
		
	}).catch(err => {
		res.status(500).send({
			message: 'Error: Could not find user with ID: ' + id
		});
	});
};

// Update an account by ID
exports.updateByID = (req, res) => {
	
	const id = req.params.id;
	
	
	Account.update(req.body, {
		where: {id: id}
	}).then(num => {
		if(num == 1) {
			res.send({
				message: 'Account updated successfully'
			});
		}
		else {
			res.send({
				message: 'Could not update account'
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: 'Error: could not update account'
		});
	});
	
};

// Create a new account
exports.create = (req, res) => {
	
	const account = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		balance: req.body.balance
	};
	
	Account.create(account).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: 'Error creating account (1)',
			error: err,
			account: account
		});
	});
	
};

// Finds accounts by searching against id, first_name, OR last_name
exports.search = (req, res) => {
	
	// If first_name, last_name, OR id LIKE req.params.id
	let condition = {[Op.or]: [
	
		{first_name: {[Op.like]: `%${req.params.id}%`}},
		{last_name: {[Op.like]: `%${req.params.id}%`}},
		{id: {[Op.like]: `%${req.params.id}%`}}
		
	]};
	
	Account.findAll({
		where: condition
	}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: 'Error finding accounts',
			error: err
		});
	});
	
};

// Gets all accounts
exports.getAll = (req, res) => {
	Account.findAll({}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({});
	});
};

// Deletes an account
exports.remove = (req, res) => {
	
	const id = req.params.id;
	
	console.log(id);
	
	Account.destroy({
		where: {id: id}
	}).then(num => {
		if(num == 1) {
			res.send({
				message: 'Account deleted'
			});
		}
		else {
			res.send({
				message: 'Could not delete account'
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: 'Error deleting account'
		});
	});
	
};