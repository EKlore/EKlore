QuestionsGroups = new Mongo.Collection('questionsGroups');

var Schemas = {};

Schemas.QuestionsGroups = new SimpleSchema({
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
	}
});

QuestionsGroups.attachSchema(Schemas.QuestionsGroups);

Meteor.methods({
	addAQuestionsGroup: function(questionsGroupData) {
		check(questionsGroupData.title, String);
		check(questionsGroupData.label, String);
		check(questionsGroupData.level, Number);
		questionsGroupData.version = 1;
		questionsGroupData.deprecated = false;
		return QuestionsGroups.insert(questionsGroupData);
	},
	updateAQuestionsGroup: function(questionsGroupData) {
		check(questionsGroupData.questionsGroupId, String);
		check(questionsGroupData.title, String);
		check(questionsGroupData.label, String);
		check(questionsGroupData.level, Number);
		check(questionsGroupData.deprecated, Boolean);
		return QuestionsGroups.update({ _id: questionsGroupData.questionsGroupId }, {
			$set: {
				title: questionsGroupData.title,
				label: questionsGroupData.label,
				level: questionsGroupData.level,
				deprecated: questionsGroupData.deprecated
			},
			$inc: {
				version: 1
			}
		});
	}
});
