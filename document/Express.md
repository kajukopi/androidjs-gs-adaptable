Express.js cheatsheet

# ## **Basic Setup**

```javascript
const express = require("express")
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
```

# ## **Middleware**

- **Global Middleware:**

```javascript
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({extended: true})) // Parse URL-encoded bodies
app.use(express.static("public")) // Serve static files from 'public' directory
```

- **Route-Specific Middleware:**

```javascript
app.get("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method)
  next()
})
```

- **Error Handling Middleware:**

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})
```

# ## **Routing**

- **Basic Route:**

```javascript
app.get("/", (req, res) => {
  res.send("Hello World!")
})
```

- **Route Parameters:**

```javascript
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`)
})
```

- **Query Parameters:**

```javascript
app.get("/search", (req, res) => {
  res.send(`Query: ${req.query.q}`)
})
```

- **Post Route:**

```javascript
app.post("/user", (req, res) => {
  res.send("Got a POST request")
})
```

- **All HTTP Methods:**

```javascript
app.all("/secret", (req, res) => {
  res.send("Accessing the secret section")
})
```

# ## **Routing with Router**

```javascript
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Home page")
})

router.get("/about", (req, res) => {
  res.send("About page")
})

app.use("/", router)
```

# ## **Serving Static Files**

```javascript
app.use("/static", express.static("public"))

// Access static files via: http://localhost:3000/static/filename.ext
```

# ## **Handling Forms**

```javascript
app.post("/form", (req, res) => {
  res.send(`Form Data: ${JSON.stringify(req.body)}`)
})
```

# ## **Redirects**

```javascript
app.get("/old-route", (req, res) => {
  res.redirect(301, "/new-route") // Permanent redirect
})
```

# ## **Sending Responses**

- **JSON Response:**

```javascript
app.get("/json", (req, res) => {
  res.json({name: "John", age: 30})
})
```

- **File Response:**

```javascript
app.get("/download", (req, res) => {
  res.download("path/to/file")
})
```

- **Status Code:**

```javascript
app.get("/status", (req, res) => {
  res.status(404).send("Not Found")
})
```

# ## **Template Engines**

- **Using Pug:**

```javascript
app.set("view engine", "pug")

app.get("/template", (req, res) => {
  res.render("index", {title: "Hey", message: "Hello there!"})
})
```

# ## **Handling 404 Errors**

```javascript
app.use((req, res) => {
  res.status(404).send("Sorry, page not found")
})
```

# ## **Environment Variables**

```javascript
require("dotenv").config()

const port = "process.env.PORT || 3000"
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
```

# ## **Request and Response Objects**

- **Request Object (`req`):**

- `req.params`: Route parameters
- `req.query`: Query string parameters
- `req.body`: Body of POST request
- `req.headers`: Request headers

- **Response Object (`res`):**
- `res.status()`: Set the status code
- `res.send()`: Send a response
- `res.json()`: Send a JSON response
- `res.redirect()`: Redirect the request
- `res.render()`: Render a view/template

# ## **Debugging**

- **Using `console.log()` to debug:**

```javascript
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`)
  next()
})
```

# ## **Best Practices**

- **Use Async/Await for Promises:**

```javascript
app.get("/async", async (req, res) => {
  try {
    const data = "await someAsyncFunction()"
    res.send(data)
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
})
```

- **Organize Routes and Controllers:**
- Create separate files for routes, controllers, and middleware.

This should cover most of the common tasks you'll need while working with Express.js. Let me know if you need more details on any particular topic!
