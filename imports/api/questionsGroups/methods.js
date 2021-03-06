import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { QuestionsGroups } from './schema.js';
import { EkloreQuestions } from '../ekloreQuestions/schema.js';

Meteor.methods({
	addAQuestionsGroup(data) {
		let methodSchema = new SimpleSchema({
			title: { type: String },
			level: { type: Number },
			label: { type: String }
		});
		check(data, methodSchema);
		data.version = 1;
		data.deprecated = false;
		data.createdAt = new Date();
		return QuestionsGroups.insert(data);
	},
	updateAQuestionsGroup(data) {
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			title: { type: String },
			level: { type: Number },
			label: { type: String },
			deprecated: { type: Boolean }
		});
		check(data, methodSchema);
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
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			userId: { type: String }
		});
		check(data, methodSchema);
		const ekloreQuestionsForUser = EkloreQuestions.find({
			deprecated: false,
			questionsGroupId: data.questionsGroupId
		}).fetch();
		ekloreQuestionsForUser.map((cur) => {
			cur.answered = false;
			cur.userId = data.userId;
			cur.questionId = cur._id;
			cur.questionGroupId = data.questionsGroupId;
			delete cur._id;
			delete cur.createdAt;
			delete cur.questionsGroupId;
			return Meteor.call('insertQuestion', cur);
		});
		Meteor.call('addQuestionsGroupIntoUser', data);
	}
});
