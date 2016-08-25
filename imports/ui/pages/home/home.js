import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Volunteers } from '../../../api/volunteers/schema.js';

import './home.jade';
import '../../components/map/map.js';

Template.home.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allVolunteers');
	});
});

Template.home.helpers({
	volunteersList() {
		return Volunteers.find({});
	}
});

Template.home.events({});
