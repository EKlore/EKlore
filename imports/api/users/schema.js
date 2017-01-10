import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../userQuestions/schema.js';

export const Users = Meteor.users;

Users.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

Users.helpers({
	questionsCount() {
		// this = user's MongoDB document
		return UserQuestions.find({
			userId: this._id
		}).count();
	},
	questionsNotAnsweredCount() {
		// this = user's MongoDB document
		return UserQuestions.find({
			userId: this._id,
			answered: false
		}).count();
	},
	questionsAnsweredCount() {
		// this = user's MongoDB document
		return UserQuestions.find({
			userId: this._id,
			answered: true
		}).count();
	}
});
