import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UserQuestions } from '../userQuestions/schema.js';

export const Universes = new Mongo.Collection('universes');

Universes.deny({
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
	},
	matchingPower: {
		type: Number,
		decimal: true,
		min: 0.01,
		max: 1,
		label: 'Matching power or the workshop against the question or choice'
	}
});

Universes.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Universes name'
	},
	label: {
		type: String,
		label: 'Universes label'
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the choice'
	},
	color: {
		type: String,
		label: 'Universe color',
		optional: true
	},
	partner: {
		type: String,
		label: 'Partner\'s name',
		optional: true
	},
	partnerLogo: {
		type: String,
		label: 'Partner\'s logo',
		optional: true
	},
	partnerDescription: {
		type: String,
		label: 'Partner\'s description',
		optional: true
	},
	partnerWebsite: {
		type: String,
		label: 'Partner\'s website url',
		optional: true
	},
	location: {
		type: String,
		label: 'Universe\'s location',
		optional: true
	}
});

Universes.helpers({
	questionsLinked() {
		return UserQuestions.find({ 'universesLinked.universeId': this._id });
	}
});
