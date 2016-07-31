import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './newWorkshop.jade';

Template.newWorkshop.onRendered(() => {
	this.$('#workshopDateStart').datetimepicker({
		locale: 'fr',
		format: 'YYYY-MM-D HH:mm'
	});
	this.$('#workshopEndDate').datetimepicker({
		locale: 'fr',
		format: 'YYYY-MM-D HH:mm'
	});
});

Template.newWorkshop.events({
	'click #addWorkshop': function(event) {
		event.preventDefault();
		const data = {
			name: $('#workshopName').val(),
			description: $('#workshopDescription').val(),
			dateStart: moment($('#workshopDateStart').val(), 'YYYY-MM-D HH:mm').toDate(),
			dateEnd: moment($('#workshopEndDate').val(), 'YYYY-MM-D HH:mm').toDate()
		};
		if (!data.name) {
			return Bert.alert('Name must be filled', 'danger', 'growl-top-right');
		}
		if (!data.description) {
			return Bert.alert('Description must be filled', 'danger', 'growl-top-right');
		}
		if (!data.dateStart) {
			return Bert.alert('Date start must be filled', 'danger', 'growl-top-right');
		}
		if (!data.dateEnd) {
			return Bert.alert('Date end must be filled', 'danger', 'growl-top-right');
		}
		if (data.dateEnd < data.dateStart) {
			return Bert.alert('Date start must be inferior to Date end', 'danger', 'growl-top-right');
		}
		Meteor.call('addAWorkshop', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				Router.go('editWorkshop', { _id: result });
			}
		});
	}
});
