import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UserQuestions } from './schema.js';

Meteor.methods({
	insertQuestion(data) {
		check(data, Object);
		check(data.title, String);
		check(data.level, Number);
		check(data.displayType, String);
		check(data.version, Number);
		check(data.deprecated, Boolean);
		check(data.choices, Array);
		check(data.universesLinked, Array);
		check(data.workshopsLinked, Array);
		check(data.answered, Boolean);
		check(data.userId, String);
		check(data.questionId, String);
		return UserQuestions.insert(data);
	},
	removeQuestion(data) {
		check(data, String);
		return UserQuestions.remove({ _id: data });
	},
	answerQuestion(data) {
		check(data, Object);
		check(data.userQuestionId, String);
		check(data.choiceSelected, String);
		return UserQuestions.update({ _id: data.userQuestionId }, {
			$set: {
				choiceSelected: data.choiceSelected,
				answered: true,
				answerDate: new Date()
			}
		});
	},
	saveQuestionResult(data) {
		check(data, Object);
		check(data._id, String);
		check(data.result, Array);
		check(data.result[0], Object);
		check(data.result[0].result, Number);
		if (data.result[0].universeId) {
			check(data.result[0].universeId, String);
		} else if (data.result[0].workshopId) {
			check(data.result[0].workshopId, String);
		}
		return UserQuestions.update({ _id: data._id }, {
			$set: {
				result: data.result
			}
		});
	}
});

