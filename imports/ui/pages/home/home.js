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
			level: 1
		}, {
			sort: {
				lastName: 1
			}
		});
	},
	volunteersListLevel2() {
		return Volunteers.find({
			level: 2
		}, {
			sort: {
				lastName: 1
			}
		});
	},
	volunteersListLevel3() {
		return Volunteers.find({
			level: 3
		}, {
			sort: {
				lastName: 1
			}
		});
	}
});

Template.home.events({});
