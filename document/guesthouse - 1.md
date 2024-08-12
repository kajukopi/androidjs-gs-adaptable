Let's enhance your guest house management system with the following features:

### 1. **Authentication and Authorization**

We'll use **JWT (JSON Web Token)** for authentication and **roles** for authorization. You'll also need to install `bcrypt` for password hashing and `jsonwebtoken` for token generation:

```bash
npm install bcrypt jsonwebtoken
```

#### a. **User Model (`models/User.js`)**

Create a new model for users:

```javascript
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ["admin", "staff"], default: "staff"},
})

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User
```

#### b. **Auth Routes (`routes/auth.js`)**

Create routes for user registration and login:

```javascript
const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  const {username, password, role} = req.body
  try {
    const newUser = new User({username, password, role})
    await newUser.save()
    res.status(201).json({message: "User registered successfully"})
  } catch (error) {
    res.status(400).json({error: "User registration failed"})
  }
})

// Login
router.post("/login", async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({username})
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({error: "Invalid credentials"})
  }
  const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })
  res.json({token})
})

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "")
  if (!token) return res.status(401).json({error: "Access denied"})

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({error: "Invalid token"})
  }
}

// Middleware to authorize based on role
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({error: "Access denied"})
  next()
}

module.exports = {router, authenticateToken, authorizeRole}
```

#### c. **Protected Routes**

You can now protect your routes using the `authenticateToken` and `authorizeRole` middleware. For example:

```javascript
const {authenticateToken, authorizeRole} = require("./routes/auth")

app.use("/clients", authenticateToken, clientRoutes)
app.use("/staff", authenticateToken, authorizeRole("admin"), staffRoutes)
```

### 2. **Validation and Error Handling**

Use the `joi` library for request validation:

```bash
npm install joi
```

#### a. **Validation Middleware**

Create a middleware for validation:

```javascript
const Joi = require("joi")

const validate = (schema) => (req, res, next) => {
  const {error} = schema.validate(req.body)
  if (error) return res.status(400).json({error: error.details[0].message})
  next()
}

module.exports = validate
```

#### b. **Apply Validation to Routes**

For example, in your `clients` route:

```javascript
const validate = require("../middlewares/validate")
const Joi = require("joi")

const clientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string(),
  checkInDate: Joi.date(),
  checkOutDate: Joi.date(),
  room: Joi.string(),
  servicesUsed: Joi.array().items(Joi.string()),
  transfers: Joi.array().items(Joi.string()),
})

router.post("/", validate(clientSchema), async (req, res) => {
  // Your code here...
})
```

### 3. **Complex Queries and Reports**

You can create complex queries using Mongoose's aggregation framework or populate multiple levels of references.

For example, to get a report of all clients with their rooms and services:

```javascript
router.get("/report", async (req, res) => {
  const report = await Client.find().populate("room").populate("servicesUsed")
  res.json(report)
})
```

### 4. **Views using Handlebars (hbs)**

Install `hbs`:

```bash
npm install hbs
```

#### a. **Set Up hbs in Express**

In your `index.js`, set up Handlebars as the view engine:

```javascript
const hbs = require("hbs")

app.set("view engine", "hbs")
```

#### b. **Create a Basic View**

Create a `views` directory and add an `index.hbs` file:

```hbs
<html>
  <head>
    <title>Guest House Management</title>
  </head>
  <body>
    <h1>Welcome to the Guest House Management System</h1>
    <p>{{message}}</p>
  </body>
</html>
```

#### c. **Render the View**

In a route, you can render this view:

```javascript
app.get("/", (req, res) => {
  res.render("index", {message: "This is the home page."})
})
```

### 5. **Running the Application**

Make sure your `.env` file includes the `JWT_SECRET` and `MONGO_URI`, then run your server:

```bash
node index.js
```

You now have authentication, validation, error handling, complex queries, and a basic view system set up! Let me know if you need further customization.
