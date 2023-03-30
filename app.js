const express = require('express');
const mongoose = require('mongoose');
const User = require('./user-model');

const app = express();
const port = 8000;
const host = '127.0.0.1';

app.use(express.json());

mongoose
	.connect(`mongodb://${host}:27017/maktab88`)
	.then(() => console.log('database connected'))
	.catch(err => console.log(err));

// CRUD Operation
app.get('/users', async (req, res) => {
	try {
		const users = await User.find({});

		res.json({
			status: 'success',
			data: { users }
		});
	} catch (error) {
		res.json({
			status: 'error',
			message: 'something went wrong'
		});
	}
});

app.post('/users', async (req, res) => {
	try {
		const { firstname, lastname, username, password } = req.body;

		const user = await User.create({ firstname, lastname, username, password });

		res.json({
			status: 'success',
			data: { user }
		});
	} catch (error) {
		console.log(error);

		res.json({
			status: 'error',
			message: 'something went wrong'
		});
	}
});

app.get('/users/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);

		res.json({
			status: 'success',
			data: { user }
		});
	} catch (error) {
		res.json({
			status: 'error',
			message: 'something went wrong'
		});
	}
});

app.patch('/users/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const modifedInfo = req.body;

		const result = await User.findByIdAndUpdate(userId, modifedInfo, {
			new: true
		});

		res.json({
			status: 'success',
			data: { result }
		});
	} catch (error) {
		console.log(error);

		res.json({
			status: 'error',
			message: 'something went wrong'
		});
	}
});

app.delete('/users/:userId', async (req, res) => {
	try {
		const { userId } = req.params;

		const result = await User.findByIdAndDelete(userId);

		res.json({
			status: 'success',
			data: { result }
		});
	} catch (error) {
		console.log(error);

		res.json({
			status: 'error',
			message: 'something went wrong'
		});
	}
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port} ...`));
