const express = require('express');
const Todo = require('../controllers/todo');

module.exports = (app) => {
  const router = express.Router();

  router
    .get('/todo/:filter', Todo.getTodo);

  router.post('/todo', Todo.addTodo);
  router.post('/toggleAllTodo', Todo.toggleAllTodo);
  router.delete('/todo/:id', Todo.deleteTodo);
  router.put('/todo/:id', Todo.editTodo);

  app.use('/api', router);
}