const zod = require("zod");

const todoSchema = zod.object({
    task: zod.string(),
    checked: zod.boolean().default(false),
});

module.exports = { todoSchema };