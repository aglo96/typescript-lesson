const Todo = require('../models/todo');

async function findAll(ctx) {
    const todos = await Todo.find({});
    ctx.body = todos;
}

async function create(ctx) {
    const newTodo = ctx.request.body;
    const savedTodo = await newTodo.save();
    ctx.body = savedTodo;
}

async function destroy(ctx) {
    const id = ctx.params.id;
    const todo = await Todo.findById(id);
    const deleted = await todo.remove();
    ctx.body = deleted;
}

async function update (ctx) {
    // Find Todo based on id, then toggle done on/off
    const id = ctx.params.id
    const todo = await Todo.findById(id)
    todo.done = !todo.done
  
    // Update todo in database
    const updatedTodo = await todo.save()
    ctx.body = updatedTodo
  }


module.exports = {
    findAll,
    create,
    destroy,
    update,
}