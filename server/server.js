const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const account = require('./app/controllers/account.controller.js');

const app = express();

var corsOptions = {
	origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const db = require('./app/models');
//db.sequelize.sync({force: true});
db.sequelize.sync();

// ATM routes
app.get('/api/account/:id/view', account.getByID);
app.put('/api/account/:id/update', account.updateByID);

// Admin routes
app.post('/api/admin/create', account.create);
app.get('/api/admin/search/:id', account.search);
app.get('/api/admin/getaccounts', account.getAll);
app.delete('/api/admin/remove/:id', account.remove);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}.`);
});