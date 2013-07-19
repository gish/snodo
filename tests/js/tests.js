define([
    'models/todo',
    'collections/todo'
],
function(
    Todo,
    TodoCollection
){
    "use strict";

    module("Todo model");

    test("Formatted date has correct format", function()
    {
		var date          = new Date(2013, 4, 9, 17, 3);
		var model         = new Todo({ date : date });
		var formattedDate = model.get('formattedDate');
		ok(formattedDate === "9/5/13 17:3");
    });

    test("Formatted date updated when date has changed", function()
    {
		var dateOld = new Date(2013, 4, 9, 17, 3);
		var dateNew = new Date(2014, 5, 10, 18, 4);
		var todo = new Todo({ date : dateOld });

		todo.set('date', dateNew);
		ok(todo.get('formattedDate') === "10/6/14 18:4");
    });

    test("Marked as done has updated status", function()
    {
        var todo = new Todo();
        todo.setDone();
        ok(todo.get('status') === 'done');
    });

    test("Marked as pending has updated status", function()
    {
        var todo = new Todo({ status : 'done' });
        todo.setPending();
        ok(todo.get('status') === 'pending');
    });

    test("Snoozed till later", function()
    {
        var later = new Date((new Date()).getTime() + 86400 * 1E3);
        var todo  = new Todo();
        todo.snooze('later');
        ok(todo.get('date').getTime() === later.getTime());
    });

    test("Snoozed till tomorrow 8am", function()
    {
        var nextDay = new Date((new Date()).getTime() + 86400 * 1E3);
        var tomorrow = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate(), 8);
        var todo = new Todo();
        todo.snooze('tomorrow');
        ok(todo.get('date').getTime() === tomorrow.getTime());
    });

    test("Snoozed till this evening", function()
    {
        var todo;
        var today = new Date();
        todo = new Todo();
        todo.snooze('tonight');
        ok(todo.get('date').getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17).getTime());
    });

    test("Snoozed till monday next week", function()
    {
        var todo;
        var today;
        var monday;
        var daysDiff;
        today = new Date();
        todo = new Todo();

        if (today.getDay() === 0)
        {
            daysDiff = 1;
        }
        else
        {
            daysDiff = 8 - today.getDay();
        }

        monday = new Date(today.getTime() + 86400 * daysDiff * 1E3);
        monday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 8);

        todo.snooze('nextWeek');

        ok(todo.get('date').getTime() === monday.getTime());
    });

    module("Todo collection");

    test("Todos ordered by date", function()
    {
        var todos     = new TodoCollection();
        var todoLate  = new Todo({ date : new Date(2013, 6, 14) });
        var todoEarly = new Todo({ date : new Date(2013, 6, 13) });

        todos.add(todoLate).add(todoEarly);
        ok(todos.at(0) === todoEarly);
    });

    test("Todos reordered when snoozed", function()
    {
        var todos        = new TodoCollection();
        var todoSnoozed  = new Todo({ date : new Date(2013, 6, 14) });
        var todoEarly    = new Todo({ date : new Date(2013, 6, 13) });

        todos.add(todoSnoozed).add(todoEarly);
        todoSnoozed.snooze('tomorrow');

        ok(todos.at(1) === todoSnoozed);
    });

    test("Get only pending todos", function()
    {
        var todos = new TodoCollection();
        var i;

        for (i = 0; i < 5; i++)
        {
            todos.add(new Todo());
            todos.at(i).setDone();
        }

        todos.at(3).setPending();

        ok(todos.getPending()[0] === todos.at(3));
    });

    test("Get only done todos", function()
    {
        var todos = new TodoCollection();
        var i;

        for (i = 0; i < 5; i++)
        {
            todos.add(new Todo());
        }

        todos.at(3).setDone();

        ok(todos.getDone()[0] === todos.at(3));
    });

    test("Get only todos where date have passed", function()
    {
        var todos = new TodoCollection();
        var todoA = new Todo();
        var todoB = new Todo({date : new Date(2013,11, 31)});

        todos.add(todoB).add(todoA);

        ok(todos.getExpired().length === 1 && todos.getExpired()[0] === todoA);
    });
});