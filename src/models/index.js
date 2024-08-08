const mongoose = require("mongoose")

const schemaTodo = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

const Todo = mongoose.model("Todo", schemaTodo)

module.exports = Todo
