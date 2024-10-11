To-Do List Application

This is a simple to-do list web application that allows users to create, read, update, and delete tasks. The application uses Node.js, Express.js, MongoDB, and EJS for rendering views.

-> Features:

• Create: Add new tasks with a title, due date, time, and description.
• Read: View all tasks in a list.
• Update: Edit existing tasks.
• Delete: Remove tasks from the list.

-> Routes: 

• GET / - Displays all to-do list items.
• GET /add - Form to create a new to-do item.
• POST / - Adds a new to-do item.
• GET /:id/edit - Form to edit an existing to-do item.
• PATCH /:id - Updates an existing to-do item.
• DELETE /:id - Deletes a to-do item.

-> Prerequisites:

-> Ensure that you have the following installed:

• Node.js (v14 or higher)
• MongoDB
• npm (comes with Node.js)

-> Setup:

1. Clone the Repository:
    git clone https://github.com/ayushi-gajera/To-Do-List.git
    cd to-do-list

2. Install Dependencies:
    npm install

3. Set Up MongoDB:
    Make sure MongoDB is running locally.
    By default, the MongoDB connection URL in the code is: 
    await mongoose.connect("mongodb://127.0.0.1:27017/to-do-list");

4. Run the Application:
    To start the server: npm start
    This will start the app on localhost:8000.

5. Open the Application:
    Visit http://localhost:8000 to view the to-do list.

-> Testing: 

-> Manually Testing the App:

You can test the application by:

1. Navigating to the root route / to view the list of tasks.
2. Clicking on "Add" to create a new task.
3. Editing or deleting tasks by navigating to their respective routes.