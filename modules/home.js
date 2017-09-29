const express = require('express');
const mongoose = require('mongoose');

const questionController = require('./questionController');

const Router = express.Router();

Router.get('/', (req, res) => {
	res.render('interrogation');
})

Router.get('/:id', (req, res) => {
	let id = req.params.id;
	questionController.getQuestionByOrder(id, (data) => {
		res.send(data);
	})
})

Router.post('/get', (req, res) => {
	let id = req.body.id;
	questionController.getQuestionByOrder(id, (data) => {
		res.send(data);
	})
})

Router.post('/update', (req, res) => {
	let question = req.body.question;
	questionController.updateQuestionById(question, () => {
		res.send("done");
	})
})

module.exports = Router;
