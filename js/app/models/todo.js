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
			this.set('formattedDate', date.getDate() + "/" + (date.getMonth() + 1) + "/" + (date.getYear() - 100) + " " + date.getHours() + ":" + date.getMinutes());
		},
        setDone : function()
        {
            this.set('status', 'done');
        },
        setPending : function()
        {
            this.set('status', 'pending');
        },
        snooze : function(diff)
        {
            if (diff === 'later')
            {
                this.set('date', new Date(this.get('date').getTime() + 2*60*60 * 1E3));
            }
            if (diff === 'tonight')
            {
                var tonight = new Date();
                tonight = new Date(tonight.getFullYear(), tonight.getMonth(), tonight.getDate(), 17);
                this.set('date', tonight);
            }
            if (diff === 'tomorrow')
            {
                var tomorrow        = new Date((new Date()).getTime() + 86400 * 1E3);
                var tomorrowMorning = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8);
                this.set('date', tomorrowMorning);
            }
            if (diff === 'nextWeek')
            {
                var today;
                var monday;
                var daysDiff;

                today = new Date();

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

                this.set('date', monday);
            }
        }
	});

	return Todo;
});