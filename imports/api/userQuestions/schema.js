import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserQuestions = new Mongo.Collection('userQuestions');

UserQuestions.deny({
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
		label: 'Matching power or the universe against the question or choice',
		min: 0.01,
		max: 1
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
		label: 'Matching power or the workshop against the question or choice',
		min: 0.01,
		max: 1
	}
});

let ChoiceSchema = new SimpleSchema({
	choiceId: {
		type: String,
		label: 'Choice ID'
	},
	label: {
		type: String,
		label: 'tradID via i18n'
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universes to the choice',
		minCount: 1
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the choice',
		minCount: 1
	}
});

let ResultSchema = new SimpleSchema({
	universeId: {
		type: String,
		label: 'Univers ID',
		optional: true
	},
	workshopId: {
		type: String,
		label: 'Workshop ID',
		optional: true
	},
	result: {
		type: Number,
		decimal: true,
		label: 'Result for an univer of a workshop'
	}
});

UserQuestions.schema = new SimpleSchema({
	questionId: {
		type: String,
		label: 'Question ID'
	},
	userId: {
		type: String,
		label: 'User Id'
	},
	answered: {
		type: Boolean,
		label: 'Does the user has answered the question ?'
	},
	level: {
		type: Number,
		label: 'Question level',
		min: 1
	},
	version: {
		type: Number,
		label: 'Question version',
		min: 1
	},
	choices: {
		type: [ChoiceSchema],
		label: 'Choices list',
		minCount: 2
	},
	choiceSelected: {
		type: String,
		label: 'User choice',
		optional: true
	},
	deprecated: {
		type: Boolean,
		label: 'Is the question deprecated or not'
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universe to the question',
		minCount: 1
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the question',
		minCount: 1
	},
	answerDate: {
		type: Date,
		label: 'Answer date',
		optional: true
	},
	displayType: {
		type: String,
		label: 'Question display',
		allowedValues: ['scale', 'yesNo', 'qcm']
	},
	title: {
		type: String,
		label: 'Question title'
	},
	result: {
		type: [ResultSchema],
		label: 'Question result  via Choice x Question univers & workshop matching power',
		optional: true
	},
	questionGroupId: {
		type: String,
		label: 'questionGroup\s ID',
		optional: true
	}
});
