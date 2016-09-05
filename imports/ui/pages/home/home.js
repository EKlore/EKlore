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

Template.home.events({});
