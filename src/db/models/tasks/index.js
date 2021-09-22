const mongose = require('mongoose');

const { Schema } = mongose;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
});

module.exports = Task = mongose.model('tasks', taskScheme);