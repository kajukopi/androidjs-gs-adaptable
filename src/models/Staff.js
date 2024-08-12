const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
  name: {type: String, required: true},
  role: {type: String, enum: ["Manager", "Housekeeping", "Receptionist"], required: true},
  contact: String,
  assignedTasks: [String],
})

const Staff = mongoose.model("Staff", staffSchema)
module.exports = Staff