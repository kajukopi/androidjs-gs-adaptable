const router = require("express").Router()
const Todo = require("../models/")

router.get("/", async (req, res, next) => {
  const todos = await Todo.find().lean()
  res.render("index", {todos: todos.reverse()})
})

router.post("/", async (req, res, next) => {
  req.body.date = new Date().getTime()
  const newTodo = new Todo(req.body)
  await newTodo.save()
  res.redirect("/")
})

router.put("/:id", async (req, res, next) => {
  req.body.date = new Date().getTime()
  await Todo.findByIdAndUpdate(req.params.id, req.body)
  res.redirect("/")
})

router.delete("/:id", async (req, res, next) => {
  await Todo.findByIdAndDelete(req.params.id)
  res.redirect("/")
})

module.exports = router
