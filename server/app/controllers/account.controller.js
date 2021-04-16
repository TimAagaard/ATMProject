const db = require('../models');
const Account = db.account;
const Transactions = db.transactions;
const Op = db.Sequelize.Op;

// Get a single account by ID
exports.getByID = (req, res) => {
	const id = req.params.id;
	
	Account.findByPk(id).then(data => {
		res.send(data);
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
		res.send('success');
	}).catch(err => {
		res.status(500).send({
			message: 'Error creating account (1)',
			error: err,
			account: account
		});
	});
	
};

exports.search = (req, res) => {
	
	//let condition = {id: {[Op.like]: `%${req.params.id}%`}};
	
	//res.send(req.params.id);
	
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

exports.getAll = (req, res) => {
	Account.findAll({}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({});
	});
};

exports.remove = (req, res) => {
	
	const id = req.body.id;
	
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