import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './admin.jade';
import '../../components/connect/connect.js';

Template.admin.helpers({
	isAdmin() {
		return Meteor.user().profile.admin;
	}
});
