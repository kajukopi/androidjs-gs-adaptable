const express = require("express")
const router = express.Router()
const Client = require("../models/Client")

// Get all clients
router.get("/", async (req, res) => {
  const clients = await Client.find().populate("room servicesUsed transfers")
  res.json(clients)
})

// Add a new client
router.post("/", async (req, res) => {
  const newClient = new Client(req.body)
  await newClient.save()
  res.status(201).json(newClient)
})

// Get a specific client
router.get("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id).populate("room servicesUsed transfers")
  res.json(client)
})

// Update a client
router.put("/:id", async (req, res) => {
  const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.json(updatedClient)
})

// Delete a client
router.delete("/:id", async (req, res) => {
  await Client.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router
