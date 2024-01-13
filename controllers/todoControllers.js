const Todo = require('../models/todoModels')
const jwt = require('jsonwebtoken')

exports.indexTodo = async (req, res) => {
  console.log("indexTodo")
    try {
        const foundTodos = await Todo.find({})
        res.status(205).send( {
            todos: foundTodos
        })
    }
    catch(error) {
        res.status(201).send({message: error.message})
    }
}

exports.createTodo = async (req, res) => {
    try {
      const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false,
      });
  
      const savedTodo = await todo.save();
  
      res.status(200).json({ todo: savedTodo });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
exports.idOfTodo = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ todo });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateTodo = async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const todo = await Todo.findOne({ _id: req.params.id });
      
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      updates.forEach(update => (todo[update] = req.body[update]));
      await todo.save();
  
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.deleteTodo = async (req, res) => {
  try{
    await req.user.deleteOne()
    res.json({ message: 'Todo deleted' })
  }catch(error){
    res.status(400).json({message: error.message})
  }
}