import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Volunteers } from '../../../api/volunteers/schema.js';

import './listVolunteers.jade';

Template.listVolunteers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allVolunteers');
	});
});

Template.listVolunteers.helpers({
	volunteersCount() {
		return Volunteers.find({}).count();
	},
	volunteers() {
		return Volunteers.find({}, {
			fields: {
				firstName: 1,
				lastName: 1,
				pictureUrl: 1,
				functionInFete: 1,
				level: 1
			},
			sort: {
				level: 1,
				lastName: 1
			}
		});
	},
	myIndex(index) {
		return index + 1;
	}
});
