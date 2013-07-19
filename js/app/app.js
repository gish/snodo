require([
    'backbone',
    'jquery',
    'underscore',
    'models/todo',
    'collections/todo',
    'views/todo'
],
function(
    Backbone,
    $,
    _,
    Todo,
    TodoCollection,
    TodoView
){
    "use strict";
    var App = Backbone.View.extend({
        initialize : function()
        {
            var self = this;
            this.$el = $('.todo-container');

            this.todos = new TodoCollection();

            this.listenTo(this.todos, 'add', this.renderTodos);
            this.listenTo(this.todos, 'change', this.renderTodos);

            _.each(window.todos, function(todo)
            {
                self.todos.add(new Todo(todo));
            });
        },
        renderTodos : function()
        {
            var self = this;
            self.$el.empty();
            _.each(this.todos.models, function(todo)
            {
                var view = new TodoView({ model : todo });
                self.$el.append(view.render().$el);
            });
        }
    });


    $(document).ready(function()
    {
        var app = new App();
    });
});
