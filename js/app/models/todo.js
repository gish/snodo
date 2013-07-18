define(['backbone'], function(Backbone)
{
	"use strict";

	var Todo = Backbone.Model.extend({
		initialize : function()
		{
			this.set('text', '');
			this.set('alertDate', new Date());
			this.set('status', 'pending');
			this.set('formattedDate', '');
			this.formatDate();
		},
		formatDate : function()
		{
			var date;
			date = this.get('alertDate');
			this.set('formattedDate', date.getDate() + "/" + date.getMonth() + "/" + (date.getYear() - 100) + " " + date.getHours() + ":" + date.getMinutes());
		}
	});

	return Todo;
});