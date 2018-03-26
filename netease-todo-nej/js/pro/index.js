NEJ.define([
  'base/element',
  'base/event',
  'util/template/jst',
  'util/cache/storage',
  '{pro}todoModel.js',
  '{pro}constants.js',
],function(_e, _v, _t, _j, todoModel, constants, _p) {

  var _pro = _p;

  // todo filter条件
  _p.nowShowing = constants.ALL_TODO;

  // 初始化函数
  _p.init = function() {

    //注册模版
    _pro.todoTemplate = _t._$add('todo-list');
    _pro.footerTemplate = _t._$add('todo-footer');
    
    _pro.bindEvent();

    _pro.render();
  }

  // 注册事件响应函数
  _p.bindEvent = function () {
    _v._$addEvent('new-todo','enter', _pro.createTodo.bind(this), false);
    _v._$addEvent('new-todo','blur', _pro.createTodo.bind(this), false);
    _v._$addEvent('todos','change', _pro.toggleTodo.bind(this), false);
    _v._$addEvent('todos','click', _pro.destroyTodo.bind(this), false);
    _v._$addEvent('todos','dblclick', _pro.editTodo.bind(this), false);
    _v._$addEvent('todos','enter',_pro.updateTodo.bind(this),false);
    //知识点：blur和focus事件不会随着事件冒泡到父元素，而事件捕获是能接受到的。对于IE不支持事件捕获，可以使用focusout，focusin解决
    _v._$addEvent('todos','blur',_pro.updateTodo.bind(this),true);
    _v._$addEvent('toggle-all','change', _pro.toggleAll.bind(this), false);
    _v._$addEvent('footer','click', _pro.handleFooter.bind(this), false);
  }

  // todo相关操作
  _p.createTodo = function(e) {
    var value = e.target.value.trim();
    if(!value) return;
    todoModel.createTodo(value);
    e.target.value = '';
    _pro.render();
  }

  _p.destroyTodo = function(e) {
    if(e.target.className !== 'destroy')  return;
    var node = _v._$getElement(e,'c:todo');
    var id = _e._$attr(node,'data-id');
    todoModel.destroyTodo(id);
    _pro.render();
  }

  _p.editTodo = function(e) {
    var node = _v._$getElement(e,'c:todo');
    var input = node.querySelector(".edit");
    _e._$addClassName(node,'editing');
    input.focus(); 
  }

  _p.updateTodo = function(e) {
    if(e.target.className !== 'edit')  return;
    var node = _v._$getElement(e,'c:todo');
    var value = e.target.value.trim();
    var id = _e._$attr(node,'data-id');

    if(!value){
      todoModel.destroyTodo(id);
      return _pro.render();
    }
    todoModel.updateTodo(id, value);
    _pro.render();
  }

  _p.toggleTodo = function(e) {
    if(e.target.className !== 'toggle')  return;
    var node = _v._$getElement(e,'c:todo');
    var id = _e._$attr(node,'data-id');
    todoModel.toggleTodo(id);
    _pro.render();
  }

  _p.toggleAll = function(e) {
    var checked = e.target.checked;
    todoModel.toggleAll(checked);
    _pro.render();
  }

  _p.handleFooter = function(e) {
    if(e.target.nodeName === 'A'){
      return _pro.filterTodoByType(e);
    }
    if(e.target.nodeName === 'BUTTON'){
      return _pro.clearCompleted(e);
    }
  }

  _p.filterTodoByType = function(e) {
    var nowShowing = _e._$attr(e.target,'data-filter');
    _pro.nowShowing = nowShowing;
    _pro.render();
  }

  _p.clearCompleted = function(e) {
    todoModel.clearCompleted();
    _pro.render();
  }

  
  
  // 渲染函数
  _p.render = function() {
    var todos = todoModel.getTodosByType(_pro.nowShowing);
    // 渲染todo list模版
    _t._$render('todos', _pro.todoTemplate, {todoList:todos});

    var data = {
      activeTodoCount: todoModel.getCountByType(constants.ACTIVE_TODOS),
      todoCount: todoModel.getCountByType(constants.ALL_TODO),
      completedTodoCount: todoModel.getCountByType(constants.COMPLETED_TODOS),
      constants: constants,
      nowShowing:  _pro.nowShowing,
    }

    // 根据activeTodoCount数量来改变toggle all按钮
    var toggleAllButton = _e._$get('toggle-all');
    toggleAllButton.checked = data.activeTodoCount === 0;

    // 渲染todo footer模版
    _t._$render('footer', _pro.footerTemplate, data);
  }

  _p.init();

  return _p;
  
});