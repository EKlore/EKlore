import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import { Router } from 'meteor/iron:router';

import './connectButton.jade';

Template.connectButton.events({
	'click #disconnect': function(event) {
		event.preventDefault();
		return Meteor.logout((error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click #connect': function(event) {
		event.preventDefault();
		$('#ekloreNavbar').removeClass('in');
		return Router.go('myProfile');
	}
});
