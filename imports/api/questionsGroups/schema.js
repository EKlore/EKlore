import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const QuestionsGroups = new Mongo.Collection('questionsGroups');

QuestionsGroups.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

QuestionsGroups.schema = new SimpleSchema({
	level: {
		type: Number,
		label: 'Question group level'
	},
	version: {
		type: Number,
		label: 'Question group version'
	},
	deprecated: {
		type: Boolean,
		label: 'Is the question group deprecated or not'
	},
	title: {
		type: String,
		label: 'Question group title'
	},
	label: {
		type: String,
		label: 'Question group label',
		optional: true
	},
	createdAt: {
		type: String,
		label: 'Creation date'
	}
});