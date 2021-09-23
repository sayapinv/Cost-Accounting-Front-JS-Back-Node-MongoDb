const mongose = require('mongoose');

const { Schema } = mongose;

const taskScheme = new Schema({
  text: String,
  price: Number,
  date: Date
});

module.exports = Task = mongose.model('tasks', taskScheme);