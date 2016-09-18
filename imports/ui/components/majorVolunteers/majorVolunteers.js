import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Volunteers } from '../../../api/volunteers/schema.js';

import './majorVolunteers.jade';

Template.majorVolunteers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('topVolunteers');
	});
});

Template.majorVolunteers.helpers({
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
	}
});
