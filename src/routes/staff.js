const express = require("express")
const router = express.Router()
const Staff = require("../models/Staff")

// Get all staffs
router.get("/", async (req, res) => {
  const staffs = await Staff.find().populate("room servicesUsed transfers")
  res.json(staffs)
})

// Add a new staff
router.post("/", async (req, res) => {
  const newStaff = new Staff(req.body)
  await newStaff.save()
  res.status(201).json(newStaff)
})

// Get a specific staff
router.get("/:id", async (req, res) => {
  const staff = await Staff.findById(req.params.id).populate("room servicesUsed transfers")
  res.json(staff)
})

// Update a staff
router.put("/:id", async (req, res) => {
  const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.json(updatedStaff)
})

// Delete a staff
router.delete("/:id", async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router
