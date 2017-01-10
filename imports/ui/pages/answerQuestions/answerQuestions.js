import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './answerQuestions.jade';

Template.answerQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('UserQuestions.tenQuestionAtATime', Meteor.userId());
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
	},
	questionTypeRadio() {
		if (this.displayType === 'qcm' || this.displayType === 'yesNo') {
			return true;
		} else {
			return false;
		}
	}
});

Template.answerQuestions.events({
	'click #validateChoice': function(event) {
		event.preventDefault();

		function cleanFormToAnswerQuestion() {
			$('input[name="choicesForQuestion"]:checked').removeAttr('checked');
			$('#answerForRange').val('5');
		}

		const data = {
			userQuestionId: this._id
		};
		if (this.displayType === 'qcm' || this.displayType === 'yesNo') {
			data.choiceSelected = $('input[name="choicesForQuestion"]:checked').val();
		} else {
			let answer = $('#answerForRange').val();
			this.choices.map((cur) => {
				if (cur.label === answer) {
					return data.choiceSelected = cur.choiceId;
				}
			});
		}
		if (!data.choiceSelected) {
			return Bert.alert('You must choose an answer !', 'danger', 'growl-top-right');
		}
		Meteor.call('UserQuestions.answerQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				cleanFormToAnswerQuestion();
			}
		});
	}
});
