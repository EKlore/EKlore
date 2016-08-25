import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Volunteers } from './schema.js';

Meteor.methods({
	addAVolunteer(data) {
		let methodSchema = new SimpleSchema({
			firstName: { type: String },
			lastName: { type: String },
			pictureUrl: { type: String, optional: true },
			functionInFete: { type: String, optional: true }
		});
		check(data, methodSchema);
		if (!data.pictureUrl) {
			data.pictureUrl = '/no_picture.gif';
		}
		return Volunteers.insert(data);
	}
});
