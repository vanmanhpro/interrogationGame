const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const questionModel = require('./questionSchema');
const serverDataModel = require('./serverDataSchema')

mongoose.connect("mongodb://localhost/prisonersdilemma", (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('connect success');
	}
});

// Reset server data
mongoose.connection.collections['server-datas'].drop( function(err) {
    console.log('old collection dropped');
    let data = new serverDataModel({
    	totalWin : 0, 
		totalPlayer : 0
	})

	console.log(data);

	data.save( (err) => {
		console.error('server-datas reset');	
	});
});




// Reset question data
mongoose.connection.collections['questions'].drop( function(err) {
    console.log('old collection dropped');

    let questionData = JSON.parse(fs.readFileSync('questions.txt','utf-8'));

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
		} else if ( id != 3) {
			for( let i = 1; i <= 10; i++){
				singleChoice = {
					choiceName : i,
					choiceCount : 0
				}
				choice.push(singleChoice);
			}
		}

		var newQuestion = new questionModel({
			order : id,
			question : question,
			choice : choice
		})
		console.log(newQuestion)

		newQuestion.save( (err) => {
			callback(err);
		});
	}

	for( let i = 0; i < questionData.length; i++){
		addNewQuestion(i, questionData[i], (err) =>{
			console.log('question added');
		})
	}
});

