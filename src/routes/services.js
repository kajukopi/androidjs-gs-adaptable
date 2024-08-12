const express = require("express")
const router = express.Router()
const Service = require("../models/Service")

// Get all services
router.get("/", async (req, res) => {
  const services = await Service.find().populate("room servicesUsed transfers")
  res.json(services)
})

// Add a new service
router.post("/", async (req, res) => {
  const newService = new Service(req.body)
  await newService.save()
  res.status(201).json(newService)
})

// Get a specific service
router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id).populate("room servicesUsed transfers")
  res.json(service)
})

// Update a service
router.put("/:id", async (req, res) => {
  const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.json(updatedService)
})

// Delete a service
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router
