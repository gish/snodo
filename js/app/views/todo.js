define(['backbone', 'underscore', 'models/todo', 'text!templates/todo.phtml'], function(Backbone, _, Todo, TodoTemplate)
{
    "use strict";

    var TodoView = Backbone.View.extend({
        template : _.template(TodoTemplate),

        tagName : 'div',
        className : 'row',

        events : {
            'click .button-delete'   : 'remove',
            'click .button-done'     : 'done',
            'click .dropdown-menu a' : 'snooze'
        },

        initialize : function()
        {
            this.listenTo(this.model, 'change', this.render);
        },
        render : function()
        {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        remove : function()
        {
            this.$el.remove();
            this.model.destroy();
        },
        done : function()
        {
            this.model.setDone();
            this.$el.fadeOut();
        },
        snooze : function(evt)
        {
            var diff;
            diff = $(evt.target).data('snooze');
            this.model.snooze(diff);
        }
    });

    return TodoView;
});
