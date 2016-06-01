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
		const workshop = {
			name: $('#workshopName').val(),
			description: $('#workshopDescription').val(),
			dateStart: moment($('#workshopDateStart').val()).toDate(),
			dateEnd: moment($('#workshopEndDate').val()).toDate()
		};
		if (!workshop.name) {
			return Bert.alert('Name must be filled', 'danger', 'growl-top-right');
		}
		if (!workshop.description) {
			return Bert.alert('Description must be filled', 'danger', 'growl-top-right');
		}
		if (!workshop.dateStart) {
			return Bert.alert('Date start must be filled', 'danger', 'growl-top-right');
		}
		if (!workshop.dateEnd) {
			return Bert.alert('Date end must be filled', 'danger', 'growl-top-right');
		}
		if (workshop.dateEnd < workshop.dateStart) {
			return Bert.alert('Date start must be inferior to Date end', 'danger', 'growl-top-right');
		}
		Meteor.call('addAWorkshop', workshop, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				Router.go('editWorkshop', { _id: result });
			}
		});
	}
});
