Mongoose cheatsheet

### **Basic Setup**

```javascript
const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/dbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))
```

### **Creating a Schema**

```javascript
const {Schema} = mongoose

const userSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  email: {type: String, unique: true},
  createdAt: {type: Date, default: Date.now},
})
```

### **Creating a Model**

```javascript
const User = mongoose.model("User", userSchema)
```

### **CRUD Operations**

#### **Create**

```javascript
const createUser = async () => {
  const user = new User({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  })

  try {
    const result = await user.save()
    console.log("User created:", result)
  } catch (err) {
    console.error("Error creating user:", err)
  }
}
```

#### **Read**

- **Find All:**

  ```javascript
  const getUsers = async () => {
    const users = await User.find()
    console.log(users)
  }
  ```

- **Find by ID:**

  ```javascript
  const getUserById = async (id) => {
    const user = await User.findById(id)
    console.log(user)
  }
  ```

- **Find with Conditions:**
  ```javascript
  const getUserByEmail = async (email) => {
    const user = await User.findOne({email})
    console.log(user)
  }
  ```

#### **Update**

- **Find and Update:**

  ```javascript
  const updateUser = async (id) => {
    const user = await User.findByIdAndUpdate(
      id,
      {age: 35},
      {new: true} // Return the updated document
    )
    console.log("Updated User:", user)
  }
  ```

- **Update Many:**
  ```javascript
  const updateUsers = async () => {
    const result = await User.updateMany({age: {$lt: 18}}, {$set: {status: "Minor"}})
    console.log("Updated Users:", result.nModified)
  }
  ```

#### **Delete**

- **Find and Delete:**

  ```javascript
  const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id)
    console.log("Deleted User:", user)
  }
  ```

- **Delete Many:**
  ```javascript
  const deleteUsers = async () => {
    const result = await User.deleteMany({status: "Minor"})
    console.log("Deleted Users:", result.deletedCount)
  }
  ```

### **Schema Types**

- **String**

  ```javascript
  name: { type: String, required: true }
  ```

- **Number**

  ```javascript
  age: Number
  ```

- **Date**

  ```javascript
  createdAt: { type: Date, default: Date.now }
  ```

- **Boolean**

  ```javascript
  isActive: { type: Boolean, default: true }
  ```

- **Array**

  ```javascript
  tags: [String]
  ```

- **ObjectId (References)**
  ```javascript
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ```

### **Validation**

- **Built-in Validators:**

  ```javascript
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }
  ```

- **Custom Validators:**
  ```javascript
  age: {
    type: Number,
    min: 0,
    max: 120,
    validate: {
      validator: v => v % 2 === 0,
      message: props => `${props.value} is not an even number!`
    }
  }
  ```

### **Virtuals**

```javascript
userSchema
  .virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`
  })
  .set(function (v) {
    ;[this.firstName, this.lastName] = v.split(" ")
  })
```

### **Middleware (Hooks)**

- **Pre-Save Hook:**

  ```javascript
  userSchema.pre("save", function (next) {
    console.log("A user is about to be saved:", this)
    next()
  })
  ```

- **Post-Save Hook:**
  ```javascript
  userSchema.post("save", function (doc, next) {
    console.log("A user has been saved:", doc)
    next()
  })
  ```

### **Indexing**

```javascript
userSchema.index({email: 1})
```

### **Aggregation**

```javascript
const getAverageAge = async () => {
  const result = await User.aggregate([{$match: {age: {$gte: 18}}}, {$group: {_id: null, averageAge: {$avg: "$age"}}}])
  console.log("Average Age:", result[0].averageAge)
}
```

### **Populate**

```javascript
const getUserWithPosts = async (userId) => {
  const user = await User.findById(userId).populate("posts")
  console.log(user)
}
```

### **Lean Query**

```javascript
const getUsersLean = async () => {
  const users = await User.find().lean()
  console.log(users)
}
```

### **Schema Methods**

```javascript
userSchema.methods.greet = function () {
  return `Hello, ${this.name}`
}

const user = await User.findById(userId)
console.log(user.greet())
```

### **Static Methods**

```javascript
userSchema.statics.findByEmail = function (email) {
  return this.findOne({email})
}

const user = await User.findByEmail("john.doe@example.com")
console.log(user)
```

This cheatsheet covers the essential Mongoose operations you'll likely use in a Node.js project. Let me know if you need further details or examples on any topic!
