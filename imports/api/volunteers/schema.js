import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Volunteers = new Mongo.Collection('volunteers');

Volunteers.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

Volunteers.schema = new SimpleSchema({
	firstName: {
		type: String,
		label: 'Volunteer firstname'
	},
	lastName: {
		type: String,
		label: 'Volunteer lastname'
	},
	pictureUrl: {
		type: String,
		label: 'User choice',
		optional: true
	},
	functionInFete: {
		type: String,
		label: 'Volunteer function in FETE',
		optional: true
	}
});
