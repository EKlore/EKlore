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
	},
	createdAt: {
		type: String,
		label: 'Creation date'
	}
});

QuestionsGroups.attachSchema(Schemas.QuestionsGroups);

Meteor.methods({
	addAQuestionsGroup(data) {
		check(data.title, String);
		check(data.label, String);
		check(data.level, Number);
		data.version = 1;
		data.deprecated = false;
		data.createdAt = new Date();
		return QuestionsGroups.insert(data);
	},
	updateAQuestionsGroup(data) {
		check(data.questionsGroupId, String);
		check(data.title, String);
		check(data.label, String);
		check(data.level, Number);
		check(data.deprecated, Boolean);
		return QuestionsGroups.update({ _id: data.questionsGroupId }, {
			$set: {
				title: data.title,
				label: data.label,
				level: data.level,
				deprecated: data.deprecated
			},
			$inc: {
				version: 1
			}
		});
	},
	addQuestionsGroupToUser(data) {
		check(data.questionsGroupId, String);
		check(data.userId, String);
		const ekloreQuestionsForUser = EkloreQuestions.find({
			deprecated: false,
			questionsGroupId: data.questionsGroupId
		}).fetch();
		ekloreQuestionsForUser.map((cur, index, array) => {
			cur.answered = false;
			cur.userId = data.userId;
			cur.questionId = cur._id;
			delete cur._id;
			delete cur.createdAt;
			delete cur.questionsGroupId;
			console.log(cur);
		});
	}
});
