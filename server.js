const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

const homeRouter = require('./modules/home');
const addQuestionRouter = require('./modules/addQuestion');
const config = require('./config.json');

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'header'}));

mongoose.connect(config.connectionString, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('connect success');
	}
});

app.use('/', homeRouter);
app.use('/addQuestion', addQuestionRouter);

app.use(express.static(__dirname + '/public'));

app.listen(8888, () => {
	console.log("Your home work is online at 8888")
});
