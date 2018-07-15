'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'please enter the name of the task'
  },
  date: {
    created_date: {type: Date, default:Date.now},
    taken_date: {type: Date, default: null}
  },
  scores: {
    type:Number,
    required: 'please enter the scores of the task'
  },
  timetocomplete: {
    type:Number,
    required: 'please enter the time to complete of the task'
  },
   timeittakes: {
    type:Number,
    required: 'please enter the time it takes of the task'
  },
  assignee: String, //id of user
  isTimeLimited:{
    type:Boolean,
    default:false
  },
  status: {
    type: String,
    enum: ['available', 'taken', 'completed'],
    default: 'available'
  },


});

module.exports = mongoose.model('Tasks', TaskSchema);