const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
	name:{
		type: String
	},
	company:{
		type: String
	},
	year:{
		type: Number
	}
});

const Game = mongoose.model('Game',GameSchema);

module.exports = Game;