require([
    'backbone',
    'jquery',
    'models/todo'
],
function(
    Backbone,
    $,
    Todo
){
    "use strict";
    var App = Backbone.View.extend({
    });


    $(document).ready(function()
    {
        var app = new App();

        var todo = new Todo();
        console.log(todo);
    });
});