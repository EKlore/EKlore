import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Volunteers } from '../../../api/volunteers/schema.js';

import './volunteers.jade';

Template.volunteers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('midVolunteers');
		this.subscribe('lowVolunteers');
	});
});

Template.volunteers.helpers({
	alreadyVolunteer() {
		if (Meteor.user().profile.wantsToBeVolunteer) {
			return true;
		} else {
			return false;
		}
	},
	volunteersListLevel10() {
		return Volunteers.find({
			level: 10
		}, {
			sort: {
				lastName: 1
			}
		});
	},
	volunteersListLevel99() {
		return Volunteers.find({
			level: 99
		}, {
			sort: {
				lastName: 1
			}
		});
	}
});

Template.volunteers.events({
	'click .becomeVolunteer': function(event) {
		event.preventDefault();
		Meteor.call('becomeVolunteer', Meteor.userId(), (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
