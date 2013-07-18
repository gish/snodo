define([
    'models/todo'
],
function(
    Todo
){
    "use strict";

    module("Todo model");

    test("Formatted date has correct format", function()
    {
		var date          = new Date(2013, 4, 9, 17, 3);
		var model         = new Todo({ date : date });
		var formattedDate = model.get('formattedDate');
		ok(formattedDate === "9/4/13 17:3");
    });

    test("Formatted date updated when date has changed", function()
    {
		var dateOld = new Date(2013, 4, 9, 17, 3);
		var dateNew = new Date(2014, 5, 10, 18, 4);
		var todo = new Todo({ date : dateOld });

		todo.set('date', dateNew);
		ok(todo.get('formattedDate') === "10/5/14 18:4");
    });
});