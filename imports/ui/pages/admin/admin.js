import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './admin.jade';

Template.admin.helpers({
	isAdmin() {
		return Meteor.user().profile.admin;
	}
});
