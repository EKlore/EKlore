Meteor.publish('allQuestionsGroups', function() {
	return QuestionsGroups.find({});
});

Meteor.publish('aQuestionsGroup', function(questionGroupId) {
	return QuestionsGroups.find({
		_id: questionGroupId
	});
});
