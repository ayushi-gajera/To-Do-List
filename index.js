// Import required modules
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const port = "8000";
const toDoListModel = require("./models/toDoList");
const mongoose = require("mongoose");

// Middleware to override HTTP methods (for PATCH and DELETE requests)
app.use(methodOverride("_method"));

// Middleware to parse URL-encoded data and JSON data from forms
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Specify the path to the views directory
app.set("views", path.join(__dirname, "/views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
main()
  .then((res) => {
    console.log("Connection Successfully");
  })
  .catch((err) => console.log(err));

// Asynchronous function to handle the database connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/to-do-list");
}

// READ : Route to display all items on the to-do list

app.get("/", async (req, res) => {

  // Fetch all to-do list items from the database
  const toDoList = await toDoListModel.find();

  // Render the index.ejs file and pass the toDoList data
  res.render("index.ejs", { toDoList });
});

// CREATE : Route to handle the form submission for adding a new to-do item

app.get("/add", (req, res) => {

  // Render the create.ejs file
  res.render("create.ejs");
});

app.post("/", async (req, res) => {
  // Extract data from the request body
  let { title, due_time, due_date, description } = req.body;

  try {
    // Insert new to-do item into the database
    let newList = await toDoListModel.insertMany({
      title: title,
      due_time: due_time,
      due_date: due_date,
      description: description,
    });

    // Redirect to the homepage after successful creation
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving to database");
  }
});

// EDIT : Route to display the form for editing a specific to-do item

app.get("/:id/edit", async (req, res) => {
  // Extract the item ID from the URL parameters
  let { id } = req.params;

  // Find the to-do item by ID in the database
  let toDoList = await toDoListModel.findById(id);

  // Render the edit.ejs file and pass the item data
  res.render("edit.ejs", { toDoList });
});

app.patch("/:id", async (req, res) => {
  // Extract the item ID from the URL parameters
  let { id } = req.params;

  // Extract updated data from the request body
  let { title, due_time, due_date, description } = req.body;

  try {
    // Update the to-do item in the database
    let newList = await toDoListModel.findByIdAndUpdate(id, {
      title: title,
      due_time: due_time,
      due_date: due_date,
      description: description,
    });

    // Redirect to the homepage after successful update
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving to database");
  }
});

// DELETE : Route to handle deleting a to-do item

app.delete("/:id", async (req, res) => {

  // Extract the item ID from the URL parameters
  let { id } = req.params;

  // Delete the to-do item from the database
  let deleteList = await toDoListModel.deleteOne({ _id: id });

  // Redirect to the homepage after deletion
  res.redirect("/");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is started on ${port}`);
});
