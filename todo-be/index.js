const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/todo", require("./routes/todoList"));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
