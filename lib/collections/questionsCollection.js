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
	InsertQuestions: function(test) {
		return Questions.insert({});
	}
});
