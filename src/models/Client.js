const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  address: String,
  checkInDate: Date,
  checkOutDate: Date,
  room: {type: mongoose.Schema.Types.ObjectId, ref: "Room"},
  servicesUsed: [{type: mongoose.Schema.Types.ObjectId, ref: "Service"}],
  transfers: [{type: mongoose.Schema.Types.ObjectId, ref: "Transfer"}],
})

const Client = mongoose.model("Client", clientSchema)
module.exports = Client
