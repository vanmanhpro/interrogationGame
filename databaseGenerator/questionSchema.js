const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	order : {
		type: Number,
		require: true
	},
    question: { 
    	type: String,
    	require: true
    },
    choice : [{
    	choiceName : Number,
        choiceCount : Number
    }]
});

module.exports = mongoose.model('question', questionSchema)