import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Partners = new Mongo.Collection('partners');

Partners.deny({
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

let WorkshopSchema = new SimpleSchema({
	workshopId: {
		type: String,
		label: 'Workshop ID'
	}
});

let UniverseSchema = new SimpleSchema({
	universeId: {
		type: String,
		label: 'Univers ID'
	}
});

Partners.schema = new SimpleSchema({
	firstName: {
		type: String,
		label: 'Volunteer firstname',
		optional: true
	},
	lastName: {
		type: String,
		label: 'Volunteer lastname',
		optional: true
	},
	companyName: {
		type: String,
		label: 'Volunteer lastname',
		optional: true
	},
	pictureUrl: {
		type: String,
		label: 'User choice',
		optional: true
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universes to the partner',
		optional: true
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the partner',
		optional: true
	}
});
