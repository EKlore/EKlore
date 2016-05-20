import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Volunteers } from './schema.js';

Meteor.methods({
	addAVolunteer(data) {
		check(data.firstName, String);
		check(data.lastName, String);
		if (!data.pictureUrl) {
			data.pictureUrl = '/volunteers/no_picture.jpeg';
		}
		return Volunteers.insert(data);
	}
});