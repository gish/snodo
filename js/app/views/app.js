define([
    'backbone',
    'jquery',
    'underscore',
    'models/todo',
    'collections/todo',
    'views/todo',
    'views/add-form'
],
function(
    Backbone,
    $,
    _,
    Todo,
    TodoCollection,
    TodoView,
    AddForm
){
    "use strict";
    var App = Backbone.View.extend({
        initialize : function()
        {
            var self = this;
            this.$el = $('.todo-container');

            this.todos = new TodoCollection();

            this.addForm = new AddForm({ model : new Todo() });
            $('.todo-add-form').append(this.addForm.render().$el);

            this.listenTo(this.todos, 'add', this.renderTodos);
            this.listenTo(this.todos, 'change', this.renderTodos);

            this.listenTo(this.addForm, 'add', this.addTodo);

            this.todos.fetch();
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
        },
        addTodo : function(todo)
        {
            this.todos.add(todo, { at : 0 });
            todo.save();
        }
    });

    return App;
});