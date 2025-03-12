const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://darshan22:Onepiece227@cluster0.1fvfl.mongodb.net/practice_todo_list"
);

const TodoSchema = new mongoose.Schema({
  task: String,
  checked: { 
    type: Boolean,
    default: false
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = { TodoModel };
