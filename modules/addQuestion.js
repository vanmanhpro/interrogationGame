const express = require('express');
const questionController = require('./questionController.js')

const Router = express.Router();

Router.get('/', (req, res) => {
	res.render('addQuestion');
})

Router.post('/', (req, res) => {
	let question = req.body.question;
	questionController.addNewQuestion(question)
	 	.then((question) => 
	 		{
	 			res.redirect('/addQuestion');
	 			console.log('question saved');
	 		})
	 	.catch((err) => console.log(err));
})

module.exports = Router;