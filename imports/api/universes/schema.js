import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UserQuestions } from '../userQuestions/schema.js';

export const Universes = new Mongo.Collection('universes');

Universes.deny({
	insert() {
		return true; },
	update() {
		return true; },
	remove() {
		return true; }
});

let WorkshopSchema = new SimpleSchema({
	workshopId: {
		type: String,
		label: 'Workshop ID'
	},
	matchingPower: {
		type: Number,
		decimal: true,
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
	}
});

Universes.helpers({
	questionsLinked() {
		return UserQuestions.find({ 'universesLinked.universeId': this._id });
	},
	workshopsLinkedCount() {
		return this.workshopsLinked.length;
	}
});
