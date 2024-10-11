const mongoose = require("mongoose");

const toDoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  due_time: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const toDoList = mongoose.model("toDoList", toDoListSchema);
module.exports = toDoList;
