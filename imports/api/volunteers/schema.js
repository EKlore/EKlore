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

export const volunteersSchema = new SimpleSchema({
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
	},
	level: { // Need to refactor the level because it doesn't make much sense now
		type: Number,
		label: 'Volunteer level',
		min: 1
	}
});

Volunteers.schema = volunteersSchema;
