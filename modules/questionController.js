const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const questionModel = require('./questionSchema');

const getQuestionByOrder = (id, callback) => {
	var typeQuestion = questionModel;
	typeQuestion.findOne( {'order' : id}, (err, question) => {
		if (err) {
			console.log(err);
		} else {
			callback(question);
		}
	})
}

const updateQuestionById = (updatedQuestion, callback) => {
	questionModel.update({ _id: updatedQuestion._id }, { $set: updatedQuestion}, callback);
}

module.exports = {
	getQuestionByOrder,
	updateQuestionById
}