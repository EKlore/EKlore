import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Volunteers } from '../../../api/volunteers/schema.js';

import './volunteers.jade';

Template.volunteers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('topVolunteers');
		this.subscribe('midVolunteers');
		this.subscribe('lowVolunteers');
	});
});

Template.volunteers.helpers({
	volunteersListLevel1() {
		return Volunteers.find({
			level: {
				$lt: 10
			}
		}, {
			sort: {
				level: 1
			}
		});
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
