const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  roomNumber: {type: String, required: true},
  type: {type: String, enum: ["Single", "Double", "Suite"], required: true},
  pricePerNight: Number,
  status: {type: String, enum: ["Available", "Booked", "Out of Service"], default: "Available"},
  assets: [{type: mongoose.Schema.Types.ObjectId, ref: "Asset"}],
  currentClient: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
})

const Room = mongoose.model("Room", roomSchema)
module.exports = Room