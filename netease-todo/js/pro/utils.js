NEJ.define([
  'util/cache/storage',
],function(_j, _p) {

  _p.store = function(namespace, data) {
    if(data) {
      return _j._$setDataInStorage(namespace, JSON.stringify(data));
    }
    var store = _j._$getDataInStorage(namespace);
    return (store && JSON.parse(store)) || [];
  }

  _p.uuid = function() {
    return new Date().getTime();
  }

  _p.extend = function () {
    var newObj = {};
    for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }

  return _p;
});