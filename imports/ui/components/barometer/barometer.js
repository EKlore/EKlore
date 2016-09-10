import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './barometer.jade';

Template.barometer.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allQuestionsForScore', Meteor.userId());
		this.subscribe('userQuestionsNotAnswered', Meteor.userId());
	});
});

Template.barometer.helpers({
	surveyIsOver() {
		let stillQuestionsNotAnswered = UserQuestions.find({ userId: Meteor.userId(), answered: false }).count();
		console.log(Meteor.user().profile.questionsGroups, stillQuestionsNotAnswered);
		if (Meteor.user().profile.questionsGroups.length === 3 && stillQuestionsNotAnswered === 0) {
			return true;
		} else {
			return false;
		}
	}
});
