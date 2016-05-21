import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';

import { UserQuestions } from '../../../api/userQuestions/schema.js';
import { QuestionsGroups } from '../../../api/questionsGroups/schema.js';
import { Universes } from '../../../api/universes/schema.js';

import './myProfile.jade';
import '../../components/signIn/signIn.js';
import '../../components/signUp/signUp.js';


Template.myProfile.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allQuestionsGroups');
		this.subscribe('allUniversesLinkableToWorkshop');
		this.subscribe('allWorkshopsLinkableToUniverse');
		this.subscribe('userQuestionsNotAnswered', Meteor.userId());
		this.subscribe('resultForQuestionsAnswered', Meteor.userId());
	});
});

Template.myProfile.helpers({
	userHasQuestionsGroupsInProfile() {
		if (!Meteor.user().profile.questionsGroups || Meteor.user().profile.questionsGroups.length === 0) {
			return false;
		} else {
			return true;
		}
	},
	alreadyAnsweredQuestions() {
		return UserQuestions.find({
			userId: Meteor.userId(),
			answered: true,
			deprecated: false
		}).count();
	},
	questionsGroup() {
		let questionsGroupCurrentlyInUser = Meteor.user().profile.questionsGroups;
		return QuestionsGroups.find({
			_id: {
				$nin: questionsGroupCurrentlyInUser
			},
			deprecated: false
		}, {
			sort: {
				title: 1
			},
			fields: {
				deprecated: 1,
				title: 1,
				label: 1
			}
		});
	},
	notAnsweredQuestions() {
		return UserQuestions.find({
			userId: Meteor.userId(),
			answered: false,
			deprecated: false
		}).count();
	},
	universes() {
		let questions = UserQuestions.find({
			userId: Meteor.userId(),
			answered: true,
			deprecated: false
		}, {
			fields: {
				result: 1,
				color: 1
			}
		}).fetch();
		let questionsObject = {};
		let questionsArray = [];
		questions.map((cur, index, array) => {
			cur.result.map((cur1, index1, array1) => {
				if (cur1.universeId) {
					if (questionsObject[cur1.universeId]) {
						questionsObject[cur1.universeId].value += cur1.result;
						questionsObject[cur1.universeId].long += 1;
					} else {
						questionsObject[cur1.universeId] = {
							value: cur1.result,
							long: 1,
							color: cur1.color
						};
					}
				}
			});
		});
		for (prop in questionsObject) {
			questionsArray.push({
				_id: prop,
				value: lodash.round(questionsObject[prop].value / questionsObject[prop].long * 100, 2),
				valueForCircle: lodash.round(questionsObject[prop].value / questionsObject[prop].long * 100 / 4 + 75, 0),
				color: questionsObject[prop].color
			});
		}
		questionsArray.sort((a, b) => {
			if (a.value < b.value) {
				return 1;
			} else if (a.value > b.value) {
				return -1;
			} else {
				return 0;
			}
		});
		return questionsArray;
	},
	universeName() {
		return Universes.findOne({ _id: this._id }, {
			fields: {
				name: 1
			}
		}).name;
	}
});

Template.myProfile.events({
	'click .addQuestionsGroupToUser': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: this._id,
			userId: Meteor.userId()
		};
		Meteor.call('addQuestionsGroupToUser', data, (error, result) => {
			if (error) {
				return error.message;
			}
		});
	}
});
