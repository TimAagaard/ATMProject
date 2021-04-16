To Run:

1) Install Node.js and make sure it is in your PATH

2) Install Angular-CLI

3) CD into the project directory

4) Install and start MySQL

5) Import the database 'test.db' located in the root of the project folder into your local MySQL installation

6) Either set the username and password for the database to root / rootpass, or edit server/app/config/db.config.js to reflect your credentials

4) Start the back-end by running `node server/server.js`

5) Start the front-end by running `ng serve --open`

<hr>

Routes:

GET /api/account/:id/view - gets all account information by :id/view

PUT /api/account/:id/update - Updates an account

POST /api/admin/create - Creates a new account

GET /api/admin/search/:id - searches for account either by account ID or first / last name

GET /api/admin/getaccounts - gets every account

DELETE /api/admin/remove - removes an account

<hr>

How To Use:

Should be pretty self explanatory

The default page is the ATM

The Navigation bar at the top will allow you to switch between that and the admin page

The ATM page has prompts that explain how to use it

The admin page has a button for creating new users, a search bar, and a list of users with buttons to delete / update them

