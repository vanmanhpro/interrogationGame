const fs = require('fs');
const path = require('path');

const questionModel = require('./questionSchema');
const QuestionFile = path.join(__dirname + '/question.json');

const getQuestionByOrder = (id, callback) => {
	var typeQuestion = questionModel;
	typeQuestion.find( (err, questionsSet) => {
		if (err) {
			console.log(err);
		} else {
			callback(questionsSet[id]);
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