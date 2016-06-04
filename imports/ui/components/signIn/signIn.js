import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';

import './signIn.jade';

Template.signIn.events({
	'submit .userLogIn': function(event) {
		event.preventDefault();
		check($(event.target).find('#signInEmail').val(), String);
		check($(event.target).find('#singInPassword').val(), String);
		Meteor.loginWithPassword($(event.target).find('#signInEmail').val(), $(event.target).find('#singInPassword').val());
	}
});
