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
		var date          = new Date('2013-04-09 17:03');
		var model         = new Todo({ alertDate : date });
		var formattedDate = model.get('formattedDate');
		ok(formattedDate === "04/09/13 17:03");
    });
});