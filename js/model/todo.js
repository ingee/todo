var app = app || {};

app.Todo = Backbone.Model.extend({
  default: {
    title: '',
    completed: false
  },
  
  toogle: function(){
    this.save({
      completed: !this.get('completed')
    });
  }
});
