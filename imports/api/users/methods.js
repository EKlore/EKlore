import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Users } from './schema.js';
import { UserQuestions } from '../userQuestions/schema.js';

Meteor.methods({
	/*
	This method will add for a user all the questions linked to
	a questions group
	*/
	'Users.addQuestionsGroupIntoUser': (data) => {
		// Check method params
		let methodSchema = new SimpleSchema({
			userId: { type: String },
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);
		// If OK the code continue
		let nbQuestions = UserQuestions.find({ userId: data.userId }, {
			fields: {
				_id: 1
			}
		}).count();

		return Users.update({ _id: data.userId }, {
			$addToSet: {
				'profile.questionsGroups': data.questionsGroupId
			},
			$set: {
				'profile.nbQuestions': nbQuestions
			}
		});
	},
	'Users.becomeVolunteer': (userId) => {
		// Check method params
		check(userId, String);
		// If OK the code continue
		return Users.update({ _id: userId }, {
			$set: {
				'profile.wantsToBeVolunteer': true
			}
		});
	},
	/*
	This method will fix the number of questions for every user
	*/
	'Users.fixNbQuestions': () => {
		let users = Users.find({}, {
			fields: {
				_id: 1
			}
		});
		return users.map((cur) => {
			let nbQuestions = UserQuestions.find({ userId: cur._id }, {
				fields: {
					_id: 1,
					answered: 1
				}
			}).fetch();
			let nbAnswered = nbQuestions.filter((cur) => {
				return cur.nbAnswered = true;
			});
			return Users.update({ _id: cur._id }, {
				$set: {
					'profile.nbAnswered': nbAnswered.length,
					'profile.nbQuestions': nbQuestions.length
				}
			});
		});
	}
});
