define(['backbone', 'underscore', 'models/todo', 'text!templates/add-form.phtml'], function(Backbone, _, Todo, AddFormTemplate)
{
    "use strict";

    var AddForm = Backbone.View.extend({
        template : _.template(AddFormTemplate),

        tagName : 'div',
        className : 'row',

        events : {
            'submit .add-form' : 'add'
        },

        render : function()
        {
            this.$el.html(this.template());
            return this;
        },
        add : function(evt)
        {
            var todo;
            evt.stopImmediatePropagation();
            todo = new Todo({ text : this.$('#todo-description').val() });
            $('#todo-description').val('');
            this.trigger('add', todo);
        }
    });

    return AddForm;
});