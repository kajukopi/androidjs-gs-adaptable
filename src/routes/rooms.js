const express = require("express")
const router = express.Router()
const Room = require("../models/Room")

// Get all rooms
router.get("/", async (req, res) => {
  const rooms = await Room.find().populate("room servicesUsed transfers")
  res.json(rooms)
})

// Add a new room
router.post("/", async (req, res) => {
  const newRoom = new Room(req.body)
  await newRoom.save()
  res.status(201).json(newRoom)
})

// Get a specific room
router.get("/:id", async (req, res) => {
  const room = await Room.findById(req.params.id).populate("room servicesUsed transfers")
  res.json(room)
})

// Update a room
router.put("/:id", async (req, res) => {
  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.json(updatedRoom)
})

// Delete a room
router.delete("/:id", async (req, res) => {
  await Room.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router
