import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../schema.js';

Meteor.publish('UserQuestions.allUsersQuestions', () => {
	return UserQuestions.find({}, {
		fields: {
			userId: 1,
			answered: 1,
			_id: 1,
			'profile.score': 1
		},
		sort: {
			'profile.score': -1
		}
	});
});

Meteor.publish('UserQuestions.tenQuestionAtATime', (userId) => {
	return UserQuestions.find({
		userId: userId,
		answered: false,
		deprecated: false
	}, {
		sort: {
			level: 1
		},
		limit: 10
	});
});

Meteor.publish('UserQuestions.userQuestionsNotAnswered', (userId) => {
	return UserQuestions.find({
		userId,
		answered: false,
		deprecated: false
	}, {
		fields: {
			userId: 1,
			answered: 1,
			deprecated: 1
		}
	});
});

Meteor.publish('UserQuestions.resultForQuestionsAnswered', (userId) => {
	return UserQuestions.find({
		userId,
		answered: true,
		deprecated: false
	}, {
		fields: {
			userId: 1,
			answered: 1,
			deprecated: 1,
			result: 1
		}
	});
});

Meteor.publish('UserQuestions.allQuestionsForScore', (userId) => {
	return UserQuestions.find({
		userId: userId,
		answered: true,
		deprecated: false
	}, {
		sort: {
			level: 1
		},
		fields: {
			userId: 1,
			answered: 1,
			deprecated: 1,
			result: 1,
			choiceSelected: 1,
			level: 1,
			['choices.choiceId']: 1,
			['choices.label']: 1
		}
	});
});
