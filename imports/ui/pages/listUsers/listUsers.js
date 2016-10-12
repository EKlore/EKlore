import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import './listUsers.jade';

Template.listUsers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsers');
	});
});

Template.listUsers.helpers({
	usersCount() {
		return Meteor.users.find({}).count();
	},
	user() {
		return Meteor.users.find({}, {
			fields: {
				_id: 1,
				emails: 1,
				profile: 1
			},
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
		return this.profile.nbAnswered;
	},
	questionsCount() {
		return this.profile.nbQuestions;
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
