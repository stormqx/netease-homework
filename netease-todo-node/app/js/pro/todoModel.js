NEJ.define([
  '{pro}utils.js',
  '{pro}constants.js',
], function(utils, constants, p,o,f,r) {
  // todo数组
  var todos = [];

  // 添加todo
  p.createTodo = function(title) {
    return fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({title: title})
    })
  }

  p.toggleAll = function(checked) {
    return fetch('/api/toggleAllTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({checked: checked})
    });
  }

  p.toggleTodo = function(id) {
    const filterTodos = todos && todos.filter((item) => (item._id == id));
    const todo = filterTodos && filterTodos[0];

    if(!todo) return Promise.resolve();

    return fetch('/api/todo/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(utils.extend({}, todo, {completed: !todo.completed}))
    });
  }
  
  // 删除todo
  p.destroyTodo = function(id) {
    if(!id) return Promise.resolve();

    return fetch('/api/todo/'+id, {
      method: 'DELETE'
    });
  }

  // 更新todo
  p.updateTodo = function(id, value) {
    const filterTodos = todos && todos.filter((item) => (item._id == id));
    const todo = filterTodos && filterTodos[0];

    if(!todo) return Promise.resolve();

    return fetch('/api/todo/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(utils.extend({}, todo, {title: value}))
    });
  }

  // 清除已完成的todo
  p.clearCompleted = function() {
    todos = todos.filter(function(todo) {
      return todo.completed;
    });

    var deleteActions = todos.map((todo) => {
      return p.destroyTodo(todo && todo._id);
    })

    return Promise.all(deleteActions);
s  }

  p.getTodosByType = function(type) {
    return fetch('/api/todo/'+type)
          .then((response) => response.json())
          .then((data) => {
            return type == constants.ALL_TODO ? (todos = data) : data; 
          });
  }

  return p;
});