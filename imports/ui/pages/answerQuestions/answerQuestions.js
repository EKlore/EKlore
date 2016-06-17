import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './answerQuestions.jade';

Template.answerQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('tenQuestionAtATime', Meteor.userId());
	});
});

Template.answerQuestions.helpers({
	questionData() {
		return UserQuestions.findOne({
			userId: Meteor.userId(),
			deprecated: false,
			answered: false
		}, {
			sort: {
				level: 1
			}
		});
	}
});

Template.answerQuestions.events({
	'click #validateChoice': function(event) {
		event.preventDefault();
		const data = {
			userQuestionId: this._id,
			choiceSelected: $('input[name="choicesForQuestion"]:checked').val()
		};
		if (!data.choiceSelected) {
			return Bert.alert('You must choose an answer !', 'danger', 'growl-top-right');
		}
		Meteor.call('answerQuestion', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				$('input[name="choicesForQuestion"]:checked').removeAttr('checked');
			}
		});
	}
});
