import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './listUsers.jade';

Template.listUsers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsers');
		this.subscribe('allUsersQuestions');
	});
});

Template.listUsers.helpers({
	usersCount() {
		return Meteor.users.find({}).count();
	},
	user() {
		return Meteor.users.find({}, {
			sort: {
				'profile.score': -1
			}
		});
	},
	myIndex(index) {
		return index + 1;
	},
	emailAddress() {
		return this.emails[0].address;
	},
	questionsGroupsCount() {
		return this.profile.questionsGroups.length;
	},
	questionsAnsweredCount() {
		return UserQuestions.find({ userId: this._id, answered: true }, { fields: { _id: 1 } }).count();
	},
	questionsCount() {
		return UserQuestions.find({ userId: this._id }, { fields: { _id: 1 } }).count();
	},
	questionsGroupsCountClass() {
		if (this.profile.questionsGroups.length === 0) {
			return 'btn-danger';
		} else if (this.profile.questionsGroups.length === 3) {
			return 'btn-success';
		} else {
			return 'btn-warning';
		}
	}
});
