import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Volunteers } from './schema.js';

Meteor.methods({
	addAVolunteer(data) {
		let methodSchema = new SimpleSchema({
			firstName: { type: String, optional: true },
			lastName: { type: String, optional: true },
			pictureUrl: { type: String, optional: true },
			functionInFete: { type: String, optional: true }
		});
		check(data, methodSchema);
		if (!data.pictureUrl) {
			data.pictureUrl = '/no_picture.gif';
		}
		data.level = 99;
		return Volunteers.insert(data);
	},
	updateAVolunteer(data) {
		let methodSchema = new SimpleSchema({
			volunteerId: { type: String },
			firstName: { type: String, optional: true },
			lastName: { type: String, optional: true },
			pictureUrl: { type: String, optional: true },
			functionInFete: { type: String, optional: true },
			level: { type: Number, min: 1 }
		});
		check(data, methodSchema);
		return Volunteers.update({ _id: data.volunteerId }, {
			$set: {
				firstName: data.firstName,
				lastName: data.lastName,
				functionInFete: data.functionInFete,
				pictureUrl: data.pictureUrl,
				level: data.level
			}
		});
	}
});
