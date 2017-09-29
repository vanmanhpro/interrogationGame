const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const questionModel = require('./questionSchema');

mongoose.connect("mongodb://localhost/prisonersdilemma", (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('connect success');
	}
});



let data = JSON.parse(fs.readFileSync('questions.txt','utf-8'));

const addNewQuestion = (id, question, callback) => {
	console.log(id);
	console.log(question);
	let choice = []; //choices for each question
	if (id == 1){
		singleChoice = {
			choiceName : 4,
			choiceCount : 0
		}
		choice.push(singleChoice);
		singleChoice = {
			choiceName : 10,
			choiceCount : 0
		}
		choice.push(singleChoice);
	} else if ( id == 5) {
		for( let i = 1; i <= 15; i++){
			singleChoice = {
				choiceName : i,
				choiceCount : 0
			}
			choice.push(singleChoice);
		}
	} else {
		for( let i = 1; i <= 10; i++){
			singleChoice = {
				choiceName : i,
				choiceCount : 0
			}
			choice.push(singleChoice);
		}
	}

	var newQuestion = new questionModel({
		question : question,
		choice : choice
	})
	console.log(newQuestion)

	newQuestion.save( (err) => {
		callback(err);
	});
}

// const add = (id) =>{
// 	addNewQuestion(id, data[id], (err) => {
// 		if (id < data.length - 1) add(id + 1);
// 	});
// }

for( let i = 0; i < data.length; i++){
	addNewQuestion(i, data[i], (err) =>{
		console.log('Data added');
	})
}

