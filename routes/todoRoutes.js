const express = require('express')
const router = express.Router()
const todoControllers = require('../controllers/todoControllers');

console.log('Registering routes for /todo'); // Add this line

router.get('/', todoControllers.indexTodo)
router.post('/', todoControllers.createTodo)
router.get('/todo/:id', todoControllers.idOfTodo)
router.put('/todo/:id', todoControllers.updateTodo)
router.delete('/todo/:id', todoControllers.deleteTodo)

router.use('*', (req, res) => {
  console.log("Bad route for: ", req.url)
    res.status(404).json({ message: 'Not Found' });
  });
  
module.exports = router