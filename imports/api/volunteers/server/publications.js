import { Meteor } from 'meteor/meteor';

import { Volunteers } from '../schema.js';

Meteor.publish('allVolunteers', () => {
	return Volunteers.find({});
});

Meteor.publish('topVolunteers', () => {
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

Meteor.publish('midVolunteers', () => {
	return Volunteers.find({
		level: 10
	}, {
		sort: {
			lastName: 1
		}
	});
});

Meteor.publish('lowVolunteers', () => {
	return Volunteers.find({
		level: 99
	}, {
		sort: {
			lastName: 1
		}
	});
});

Meteor.publish('aVolunteer', (volunteerId) => {
	return Volunteers.find({ _id: volunteerId });
});
