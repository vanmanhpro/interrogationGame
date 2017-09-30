const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const serverDataModel = require('./serverDataSchema');

const getServerData = (callback) => {
	serverDataModel.findOne( (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
			callback(data);
		}
	})
}

const updateServerData = (state, playersTotalChoiceName, playersTotalMove) => {
	serverDataModel.findOne( (err, data) => {
		if (err) {
			console.log(err);
		} else {;
			newData = data;
			newData.totalChoiceName += Number(playersTotalChoiceName);
			newData.totalMove += Number(playersTotalMove);
			newData.averageChoiceMade = newData.totalChoiceName / newData.totalMove;

			if (state == "win"){
				newData.totalWin++;
			}
			newData.totalPlayer++;
			data.set(newData);
			console.log(newData);

			data.save((err, updatedData) => {
				if (err) {
					console.error(err);
				} else {
					console.log("Updated data ^^")
				}
			})
		}
	})	
}

module.exports = {
	getServerData,
	updateServerData
}