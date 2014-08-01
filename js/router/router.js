var app = app || {};

var Workspace = Backbone.Router.extend({
  routes: {
    '*filter': 'setFilter'
  },
  
  setFilter: function(param){
    app.todoFilter = param;
    app.todos.trigger('filter');
  }
});

app.todoRouter = new Workspace();
Backbone.history.start();
