const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const TodoSchema = new mongoose.Schema({
  task: String,
  checked: { 
    type: Boolean,
    default: false
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = { TodoModel };
