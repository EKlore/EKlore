import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const EkloreQuestions = new Mongo.Collection('ekloreQuestions');

EkloreQuestions.deny({
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

let UniverseSchema = new SimpleSchema({
	universeId: {
		type: String,
		label: 'Univers ID'
	},
	matchingPower: {
		type: Number,
		decimal: true,
		min: 0.01,
		max: 1,
		label: 'Matching power or the universe against the question or choice'
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

let ChoiceSchema = new SimpleSchema({
	choiceId: {
		type: String,
		label: 'Choice ID'
	},
	label: {
		type: String,
		label: 'tradID via i18n',
		optional: true
	},
	pictureSource: {
		type: String,
		label: 'Url or image path',
		optional: true
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universes to the choice',
		optional: true
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the choice',
		optional: true
	}
});

EkloreQuestions.schema = new SimpleSchema({
	level: {
		type: Number,
		label: 'Question level',
		min: 0
	},
	version: {
		type: Number,
		label: 'Question version',
		min: 0
	},
	choices: {
		type: [ChoiceSchema],
		label: 'Choices list',
		optional: true
	},
	deprecated: {
		type: Boolean,
		label: 'Is the question deprecated or not'
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universe to the question',
		optional: true
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the question',
		optional: true
	},
	questionsGroupId: {
		type: String,
		label: 'Question group ID',
		optional: true
	},
	displayType: {
		type: String,
		label: 'Question display',
		allowedValues: ['text', 'picture']
	},
	title: {
		type: String,
		label: 'Question title'
	},
	createdAt: {
		type: Date,
		label: 'Question creation date'
	}
});
