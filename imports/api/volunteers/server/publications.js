import { Meteor } from 'meteor/meteor';

import { Volunteers } from '../schema.js';

Meteor.publish('allVolunteers', () => {
	return Volunteers.find({});
});
