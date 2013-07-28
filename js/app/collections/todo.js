define(['backbone', 'backbone-localstorage', 'models/todo'], function(Backbone, BackboneLocalstorage, Todo)
{
    "use strict";

    var TodoCollection = Backbone.Collection.extend({
        localStorage : new Backbone.LocalStorage("todos"),
        model : Todo,

        initialize : function()
        {
            this.on('change add', this.sort);
        },

        // Order todos by date
        comparator : function(todo)
        {
            return todo.get('date').getTime();
        },
        // Get todos that are pending
        getPending : function()
        {
            return this.where({ status : 'pending' });
        },
        // Get done todos
        getDone : function()
        {
            return this.where({ status : 'done' });
        },
        // Get todos that are pending and should be carried out
        getExpired : function()
        {
            return this.filter(function(todo)
            {
                return todo.get('date').getTime() <= (new Date()).getTime() && todo.get('status') === 'pending';
            });
        }
    });

    return TodoCollection;
});
