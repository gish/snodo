define(['backbone'], function(Backbone)
{
	"use strict";

	var Todo = Backbone.Model.extend({
		initialize : function()
		{
			this.formatDate();
            this.on('change:date', this.formatDate);
		},
		defaults : function()
		{
			return {
				text : '',
				date : new Date(),
				status : 'pending'
			};
		},
		formatDate : function()
		{
			var date;
			date = this.get('date');
			this.set('formattedDate', date.getDate() + "/" + date.getMonth() + "/" + (date.getYear() - 100) + " " + date.getHours() + ":" + date.getMinutes());
		}
	});

	return Todo;
});