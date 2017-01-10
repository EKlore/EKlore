import { Meteor } from 'meteor/meteor';

import { QuestionsGroups } from '../schema.js';

Meteor.publish('QuestionsGroups.allQuestionsGroups', () => {
	return QuestionsGroups.find({}, {
		fields: {
			title: 1,
			label: 1,
			deprecated: 1
		}
	});
});

Meteor.publish('QuestionsGroups.aQuestionsGroup', (questionsGroupId) => {
	return QuestionsGroups.find({
		_id: questionsGroupId
	});
});
