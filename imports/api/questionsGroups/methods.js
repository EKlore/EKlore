import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { QuestionsGroups } from './schema.js';
import { EkloreQuestions } from './schema.js';

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
			Meteor.call('insertQuestion', cur);
		});
		Meteor.call('addQuestionsGroup', data);
	}
});
