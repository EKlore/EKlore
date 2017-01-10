import { Meteor } from 'meteor/meteor';

import { EkloreQuestions } from '../schema.js';

Meteor.publish('EkloreQuestions.allEkloreQuestions', () => {
	return EkloreQuestions.find({}, {
		fields: {
			title: 1,
			version: 1,
			displayType: 1,
			questionsGroupId: 1,
			deprecated: 1,
			universesLinked: 1,
			workshopsLinked: 1,
			choices: 1,
			level: 1
		}
	});
});

Meteor.publish('EkloreQuestions.anEkloreQuestion', (ekloreQuestionId) => {
	return EkloreQuestions.find({ _id: ekloreQuestionId });
});

Meteor.publish('EkloreQuestions.ekloreQuestionsLinkedToQuestionsGroup', (questionsGroupId) => {
	return EkloreQuestions.find({ questionsGroupId: questionsGroupId }, {
		fields: {
			title: 1,
			questionsGroupId: 1,
			deprecated: 1
		}
	});
});

Meteor.publish('EkloreQuestions.allEkloreQuestionsForCountQuestionsGroups', () => {
	return EkloreQuestions.find({}, {
		fields: {
			questionsGroupId: 1
		}
	});
});
