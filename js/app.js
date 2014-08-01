var app = app || {};
var ENTER_KEY = 13;

$(function(){
  new app.AppView();
  app.todos.fetch();
});
