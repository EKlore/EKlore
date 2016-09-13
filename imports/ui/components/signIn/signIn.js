import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import { Bert } from 'meteor/themeteorchef:bert';

import './signIn.jade';

Template.signIn.events({
	'submit .userLogIn': function(event) {
		event.preventDefault();
		check($(event.target).find('#signInEmail').val(), String);
		check($(event.target).find('#singInPassword').val(), String);
		Meteor.loginWithPassword($(event.target).find('#signInEmail').val(), $(event.target).find('#singInPassword').val(), (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
