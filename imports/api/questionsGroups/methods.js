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
	/*
	This method will add for a user all the questions linked to q
	*/
	addQuestionsGroupQuestionsToUser(data) {
		// Check method params
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			userId: { type: String }
		});
		check(data, methodSchema);

		// If OK the code continue
		const ekloreQuestionsForQuestionsGroup = EkloreQuestions.find({
			questionsGroupId: data.questionsGroupId
			deprecated: false,
		}).fetch();

		// Modify the EkloreQuestion to fit a user's question
		ekloreQestionsForQuestionsGroup.map((cur) => {
			cur.answered = false;
			cur.userId = data.userId;
			cur.questionId = cur._id;
			cur.questionGroupId = data.questionsGroupId;
			// Delete now useless properties
			delete cur._id;
			delete cur.createdAt;
			delete cur.questionsGroupId;
			// Insert this question into the user's profile
			return Meteor.call('insertQuestion', cur);
		});

		// To finish add the questionsGroup's id into the user's profile
		return Meteor.call('addQuestionsGroupIntoUser', data);
	}
});
