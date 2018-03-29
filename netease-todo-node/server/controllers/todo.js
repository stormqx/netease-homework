const Todo = require('../models/todoModel');

const {
  NEED_TITLE,
  NEED_CHECKED,
} = require('../messages');

exports.getTodo = (req, res, next) => {
  const { filter = 'all' } = req.params || {};

  let condition = null;
  if(filter === 'active') {
    condition = {completed: false};
  } else if(filter === 'completed') {
    condition = {completed: true};
  }

  Todo
  .find(condition)
  .sort({"_id" : -1})
  .exec((err, todos) => {
    if (err) {
      return res.status(500).json({ error: `在getTodo接口获取${filter} TODO时出错!` });
    }
    return res.status(200).json(todos);
  })
}

exports.addTodo = (req, res, next) => {
  // Check for reg errors
  const { title, completed } = req.body;

  // Return error if no username provided
  if (!title) {
    return res.status(422).send({ error: NEED_TITLE });
  }

  const todo = new Todo({
    title,
  });

  todo.save((saveErr, td) => {
    if (saveErr) {
      return res.status(500).json({ error: saveErr.message });
    }
    
    res.status(200).json({
      todo: td,
    });
  });

}

exports.deleteTodo = (req, res, next) => {
  const { id } = req.params;

  Todo.findByIdAndRemove(id, (err, source) => {
    if (err) {
      return res.status(500).json({ error: `尝试发现并删除TODO数据时出现错误: ${err.message}` });
    } else if (!source) {
      return res.status(404).json({ error: `没有找到当前ID的TODO数据, id: ${id}` });
    }
    return res.status(200).json({ message: `数据API删除成功 ${id}` });
  });
}

exports.editTodo = (req, res, next) => {
  const { title, completed } = req.body;
  const { id } = req.params;
  if (!title) {
    return res.status(422).send({ error: NEED_TITLE });
  }

  const payload = {
    id, title, completed
  };

  Todo.findByIdAndUpdate(id, payload, (err, source) => {
    if (err) {
      return res.status(500).json({ error: `尝试发现并更新TODO数据时出现错误: ${err.message}` });
    } else if (!source) {
      return res.status(404).json({ error: `没有找到当前ID的TODO数据, id: ${id}` });
    }
    return res.status(200).json({ message: `数据API更新成功 ${id}` });
  })
}

exports.toggleAllTodo = (req, res, next) => {
  const { checked } = req.body;

  if(!(typeof checked === 'boolean')) {
    return res.status(422).send({ error: NEED_CHECKED });
  }

  Todo.updateMany({}, {completed: checked}, (err, source) => {
    if (err) {
      return res.status(500).json({ error: `尝试发现并更新TODO数据时出现错误: ${err.message}` });
    }
    
    return res.status(200).json({ message: `数据API更新成功` });
  })
}