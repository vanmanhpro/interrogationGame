const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverDataSchema = new Schema({
    totalChoiceName: {
        type: Number,
        default: 0
    },
    totalMove: {
        type: Number,
        default: 0
    },
    averageChoiceMade: {
        type: Number,
        default: 100
    },
    totalWin: {
        type: Number,
        require: true
    },
    totalPlayer: { 
        type: Number,
        require: true
    },
    ip : [{
        choiceName : Number,
        choiceCount : Number
    }]
});

module.exports = mongoose.model('server-datas', serverDataSchema)