import { Meteor } from 'meteor/meteor';

import { QuestionsGroups } from '../schema.js';

Meteor.publish('allQuestionsGroups', () => {
	return QuestionsGroups.find({}, {
		fields: {
			title: 1,
			label: 1,
			deprecated: 1
		}
	});
});

Meteor.publish('aQuestionsGroup', (questionsGroupId) => {
	return QuestionsGroups.find({
		_id: questionsGroupId
	});
});
