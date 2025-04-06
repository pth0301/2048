const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    playerId: Number,
    name: String,
    password: String
});

module.exports = mongoose.model('player', playerSchema, "players");