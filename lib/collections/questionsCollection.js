Questions = new Mongo.Collection('questions');

var Schemas = {};

QuestionSchema = new SimpleSchema({
	questionID: {
		type: String,
		label: 'Question ID'
	},
	level: {
		type: Number,
		label: 'Level of the question on the interface'
	},
	answered: {
		type: Boolean,
		label: 'Does the user has answered the question ?'
	},
	questionType: {
		type: String,
		label: 'Question type',
		allowedValues: ['list']
	},
	answers: {
		type: [String],
		label: 'Answers list'
	}
});

Schemas.Questions = new SimpleSchema({
	userID: {
		type: String,
		label: 'User ID',
	},
	questions: {
		type: [QuestionSchema],
		label: 'List of question'
	}
});

Questions.attachSchema(Schemas.Questions);

Meteor.methods({
	insertQuestions: function(test) {
		return Questions.insert({});
	}
});
