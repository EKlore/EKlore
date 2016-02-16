Questions = new Mongo.Collection('questions');

var Schemas = {};

UniverSchema = new SimpleSchema({
	universID: {
		type: String,
		label: 'Univers ID'
	},
	matchingPower: {
		type: Number,
		label: 'Matching power or the univers against the question or choice'
	}
});

WorkshopSchema = new SimpleSchema({
	workshopID: {
		type: String,
		label: 'Workshop ID'
	},
	matchingPower: {
		type: Number,
		label: 'Matching power or the workshop against the question or choice'
	}
});

ChoiceSchema = new SimpleSchema({
	choiceID: {
		type: String,
		label: 'Choice ID'
	},
	label: {
		type: String,
		label: 'tradID via i18n'
	},
	pictureSource: {
		type: String,
		label: 'Url or image path',
		optional: true
	},
	universLinked: {
		type: [UniverSchema],
		label: 'List of the linked univers to the choice'
	},
	workshopLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the choice'
	}
});

ResultSchema = new SimpleSchema({
	universID: {
		type: String,
		label: 'Univers ID',
		optional: true
	},
	workshopID: {
		type: String,
		label: 'Workshop ID',
		optional: true
	},
	result: {
		type: Number,
		label: 'Result for an univer of a workshop'
	}
});

Schemas.Questions = new SimpleSchema({
	questionID: {
		type: String,
		label: 'Question ID'
	},
	userID: {
		type: String,
		label: 'User ID',
	},
	answered: {
		type: Boolean,
		label: 'Does the user has answered the question ?'
	},
	level: {
		type: Number,
		label: 'Question level'
	},
	version: {
		type: Number,
		label: 'Question version'
	},
	choices: {
		type: [ChoiceSchema],
		label: 'Choices list'
	},
	choiceSelected: {
		type: String,
		label: 'User choice'
	},
	deprecated: {
		type: Boolean,
		label: 'Is the question deprecated or not'
	},
	universLinked: {
		type: [UniverSchema],
		label: 'List of the linked univers to the question'
	},
	workshopLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the question'
	},
	answerDate: {
		type: Date,
		label: 'Answer date'
	},
	questionType: {
		type: String,
		label: 'Question type'
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
	result: {
		type: [ResultSchema],
		label: 'Question result  via Choice x Question univers & workshop matching power'
	}
});

Questions.attachSchema(Schemas.Questions);

Meteor.methods({
	insertQuestions: function(question) {
		return Questions.insert({});
	}
});
