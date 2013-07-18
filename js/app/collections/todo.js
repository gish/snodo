define(['backbone', 'models/todo'], function(Backbone, Todo)
{
    "use strict";

    var TodoCollection = Backbone.Collection.extend({
        model : Todo,

        initialize : function()
        {
            this.on('change, add', this.sort);
        },

        // Order todos by date
        comparator : function(todo)
        {
            return todo.get('date').getTime();
        },

        getPending : function()
        {
            return this.where({ status : 'pending' });
        },

        getDone : function()
        {
            return this.where({ status : 'done' });
        }
    });

    return TodoCollection;
});