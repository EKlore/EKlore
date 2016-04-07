Meteor.publish('allQuestionsGroups', () => {
	return QuestionsGroups.find({});
});

Meteor.publish('aQuestionsGroup', (questionGroupId) => {
	return QuestionsGroups.find({
		_id: questionGroupId
	});
});
