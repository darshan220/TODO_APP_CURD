const { Router } = require("express");
const router = Router();
const { TodoModel } = require("../db/index");
// const { todoSchema } = require("../type");

router.get("/all-list", async (req, res) => {
  //get all list of todo
  const response = await TodoModel.find(); //.find will return all list
  const data = {
    list: response,
  };
  res.json(data);
});

router.post("/add-list", async (req, res) => {
  const { task } = req.body;
  // const abc = todoSchema.safeParse({ task });
  // if (!abc.success) {
  //   res.status(411).json({
  //     list: "Enter valid input",
  //   });
  //   return;
  // }
  const response = await TodoModel.create({ task }); //.create will add new todo
  res.status(200).json({
    todoId: response._id,
    list: "Task added successfully",
  });
});

router.delete("/delete-list/:id", async (req, res) => {
  const { id } = req.params;
  await TodoModel.findByIdAndDelete(id);
  res.json({
    list: "Task deleted successfully",
  });
});

router.put("/update-list/:id", async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  await TodoModel.findByIdAndUpdate(id, { task });
  res.json({
    list: "Task updated successfully",
  });
});

router.put("/checked/:id", async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;
  await TodoModel.findByIdAndUpdate(id, { checked }, { new: true });
  res.json({
    list: "Task updated successfully",
  });
});

module.exports = router;
