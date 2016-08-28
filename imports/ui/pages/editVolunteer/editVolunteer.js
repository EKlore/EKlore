import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Volunteers } from '../../../api/volunteers/schema.js';

import './editVolunteer.jade';

Template.editVolunteer.onCreated(function() {
	this.autorun(() => {
		this.subscribe('aVolunteer', Router.current().params._id);
	});
});

Template.editVolunteer.helpers({
	volunteer() {
		return Volunteers.findOne({ _id: Router.current().params._id });
	}
});

Template.editVolunteer.events({
	'click #save': function(event) {
		event.preventDefault();
		const data = {
			volunteerId: Router.current().params._id,
			firstName: $('#volunteerFirstName').val(),
			lastName: $('#volunteerLastName').val(),
			functionInFete: $('#volunteerFunctionInFete').val(),
			pictureUrl: $('#volunteerPictureUrl').val(),
			level: Number($('#volunteerLevel').val())
		};
		Meteor.call('updateAVolunteer', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	}
});
