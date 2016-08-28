import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './newVolunteer.jade';

Template.newVolunteer.events({
	'click #addVolunteer': function(event) {
		event.preventDefault();
		const data = {
			firstName: $('#volunteerFirstName').val(),
			lastName: $('#volunteerLastName').val(),
			pictureUrl: $('#volunteerPictureUrl').val(),
			functionInFete: $('#volunteerFunctionInFete').val()
		};
		Meteor.call('addAVolunteer', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				Router.go('editVolunteer', { _id: result });
			}
		});
	}
});
