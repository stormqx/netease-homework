NEJ.define([
  '{pro}utils.js',
  '{pro}constants.js',
], function(utils, constants, p,o,f,r) {
  // todo数组
  var todos = utils.store('todo');


  p.getTodos = function() {
    return todos;
  }

  // 添加todo
  p.createTodo = function(title) {
    todos.unshift({
      id: utils.uuid(),
      title: title,
      completed: false,
    });

    utils.store('todo', todos);
  }

  p.toggleAll = function(checked) {
    todos = todos.map(function(todo) {
      return {
        id: todo.id,
        title: todo.title,
        completed: checked,
      }
    });

    utils.store('todo', todos);
  }

  p.toggleTodo = function(id) {
    todos = todos.map(function(todo) {
      return todo.id != id ? 
             todo :
             utils.extend({}, todo, {completed: !todo.completed});  
    });
    
    utils.store('todo', todos);
  }
  
  // 删除todo
  p.destroyTodo = function(id) {
    todos = todos.filter(function(todo) {
      return todo.id != id;
    });
    
    utils.store('todo', todos);
  }

  // 更新todo
  p.updateTodo = function(id, value) {
    todos = todos.map(function(todo) {
      return todo.id != id ? 
             todo :
             utils.extend({}, todo, {title: value});
    })
  }

  // 清除已完成的todo
  p.clearCompleted = function() {
    todos = todos.filter(function(todo) {
      return !todo.completed;
    });

    utils.store('todo', todos);
  }

  p.getTodosByType = function(type) {
    switch(type) {
      case constants.ALL_TODO: {
        return todos;
      }
      case constants.ACTIVE_TODOS: {
        return todos && todos.filter(function(todo) {
          return todo && !todo.completed;
        });
      }
      case constants.COMPLETED_TODOS: {
        return todos && todos.filter(function(todo) {
          return todo && todo.completed;
        });
      }
    }
  }

  p.getCountByType = function(type) {
    switch(type) {
      case constants.ALL_TODO: {
        return todos && todos.length;
      }
      case constants.ACTIVE_TODOS: {
        return todos && todos.reduce(function(sum, todo) {
          return !todo.completed ? sum+1 : sum;
        }, 0);
      }
      case constants.COMPLETED_TODOS: {
        return todos && todos.reduce(function(sum, todo) {
          return todo.completed ? sum+1 : sum;
        }, 0);
      }
    }
  }

  return p;
});