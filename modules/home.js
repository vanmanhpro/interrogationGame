const express = require('express');
const mongoose = require('mongoose');

const questionController = require('./questionController');
const serverDataController = require('./serverDataController');

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

Router.post('/serverData', (req, res) => {
	console.log("hihi");
	serverDataController.getServerData( (data) => {
		res.send(data);
	})	
})

Router.post('/finalUpdate', (req, res) => {
	let state =  req.body.state;
	let playersTotalChoiceName = req.body.playersTotalChoiceName;
	let playersTotalMove = req.body.playersTotalMove;
	serverDataController.updateServerData( state, playersTotalChoiceName ,playersTotalMove );
})

module.exports = Router;
