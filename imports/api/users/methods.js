import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UserQuestions } from '../userQuestions/schema.js';

Meteor.methods({
	addQuestionsGroupIntoUser(data) {
		let methodSchema = new SimpleSchema({
			userId: { type: String },
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);
		let nbQuestions = UserQuestions.find({
			userId: data.userId
		}, {
			fields: {
				_id: 1
			}
		}).count();
		return Meteor.users.update({ _id: data.userId }, {
			$addToSet: {
				'profile.questionsGroups': data.questionsGroupId
			},
			$set: {
				'profile.nbQuestions': nbQuestions
			}
		});
	},
	becomeVolunteer(userId) {
		check(userId, String);
		return Meteor.users.update({ _id: userId }, {
			$set: {
				'profile.wantsToBeVolunteer': true
			}
		});
	},
	fixNbQuestions() {
		let users = Meteor.users.find({}, {
			fields: {
				_id: 1
			}
		});
		users.map((cur) => {
			let nbAnswered = UserQuestions.find({
				userId: cur._id,
				answered: true
			}, {
				fields: {
					_id: 1
				}
			}).count();
			let nbQuestions = UserQuestions.find({
				userId: cur._id
			}, {
				fields: {
					_id: 1
				}
			}).count();
			return Meteor.users.update({ _id: cur._id }, {
				$set: {
					'profile.nbAnswered': nbAnswered,
					'profile.nbQuestions': nbQuestions
				}
			});
		});
	}
});
