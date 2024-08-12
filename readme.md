Here's a comprehensive cheatsheet covering Express.js along with Handlebars (HBS), Cookie-Parser, Dotenv, Express-Session, and Morgan:

---

### **1. Express.js Setup**

```javascript
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
```

### **2. Dotenv Setup**

- **Install**: `npm install dotenv`
- **Usage**:

  ```javascript
  require("dotenv").config()

  // Now you can use process.env.YOUR_VARIABLE
  console.log(process.env.PORT)
  ```

### **3. Handlebars (HBS) Setup**

- **Install**: `npm install hbs`
- **Usage**:

  ```javascript
  const hbs = require("hbs")
  app.set("view engine", "hbs")

  // Set views directory if different from default 'views'
  app.set("views", path.join(__dirname, "views"))

  // Register Partials (optional)
  hbs.registerPartials(path.join(__dirname, "views/partials"))

  // Example Route
  app.get("/", (req, res) => {
    res.render("index", {title: "Home Page", message: "Welcome to Express with HBS!"})
  })
  ```

### **4. Cookie-Parser Setup**

- **Install**: `npm install cookie-parser`
- **Usage**:

  ```javascript
  const cookieParser = require("cookie-parser")
  app.use(cookieParser())

  // Set a cookie
  app.get("/setcookie", (req, res) => {
    res.cookie("username", "John Doe", {maxAge: 900000, httpOnly: true})
    res.send("Cookie has been set")
  })

  // Read a cookie
  app.get("/getcookie", (req, res) => {
    const username = req.cookies["username"]
    res.send(`Username is ${username}`)
  })

  // Clear a cookie
  app.get("/clearcookie", (req, res) => {
    res.clearCookie("username")
    res.send("Cookie cleared")
  })
  ```

### **5. Express-Session Setup**

- **Install**: `npm install express-session`
- **Usage**:

  ```javascript
  const session = require("express-session")

  app.use(
    session({
      secret: "your-secret-key", // should be stored in env
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false}, // set to true if using HTTPS
    })
  )

  // Set session data
  app.get("/setsession", (req, res) => {
    req.session.username = "John Doe"
    res.send("Session has been set")
  })

  // Access session data
  app.get("/getsession", (req, res) => {
    if (req.session.username) {
      res.send(`Session Username: ${req.session.username}`)
    } else {
      res.send("No session data found")
    }
  })

  // Destroy session
  app.get("/destroysession", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Failed to destroy session")
      }
      res.send("Session destroyed")
    })
  })
  ```

### **6. Morgan Setup**

- **Install**: `npm install morgan`
- **Usage**:

  ```javascript
  const morgan = require("morgan")
  app.use(morgan("dev")) // Logs HTTP requests to console

  // Custom Format Example
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

  // Example Route
  app.get("/", (req, res) => {
    res.send("Morgan logger is active!")
  })
  ```

### **7. Combine Everything**

```javascript
const express = require("express")
const hbs = require("hbs")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const morgan = require("morgan")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
  })
)
app.use(morgan("dev"))

// HBS Setup
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))
hbs.registerPartials(path.join(__dirname, "views/partials"))

// Routes
app.get("/", (req, res) => {
  res.render("index", {title: "Home Page", message: "Welcome to Express!"})
})

// Example Routes for Cookies and Sessions
app.get("/setsession", (req, res) => {
  req.session.username = "John Doe"
  res.send("Session has been set")
})

app.get("/getsession", (req, res) => {
  res.send(`Session Username: ${req.session.username || "No session"}`)
})

app.get("/setcookie", (req, res) => {
  res.cookie("username", "John Doe", {maxAge: 900000, httpOnly: true})
  res.send("Cookie has been set")
})

app.get("/getcookie", (req, res) => {
  res.send(`Cookie Username: ${req.cookies["username"] || "No cookie"}`)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
```

### **8. Environment Variables (`.env` Example)**

Create a `.env` file in the root directory of your project:

```
PORT=3000
SESSION_SECRET=your-secret-key
```

---

This cheatsheet should help you set up and work with Express.js, Handlebars, Cookie-Parser, Dotenv, Express-Session, and Morgan in your Node.js applications. Let me know if you need further assistance!
