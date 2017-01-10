import { Meteor } from 'meteor/meteor';

import { Volunteers } from '../schema.js';

Meteor.publish('Volunteers.allVolunteers', () => {
	return Volunteers.find({});
});

Meteor.publish('Volunteers.topVolunteers', () => {
	return Volunteers.find({
		level: {
			$lt: 10
		}
	}, {
		sort: {
			level: 1
		}
	});
});

Meteor.publish('Volunteers.midVolunteers', () => {
	return Volunteers.find({
		level: 10
	}, {
		sort: {
			lastName: 1
		}
	});
});

Meteor.publish('Volunteers.lowVolunteers', () => {
	return Volunteers.find({
		level: 99
	}, {
		sort: {
			lastName: 1
		}
	});
});

Meteor.publish('Volunteers.aVolunteer', (volunteerId) => {
	return Volunteers.find({ _id: volunteerId });
});
