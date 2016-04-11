Meteor.publish('allQuestionsGroups', () => {
	return QuestionsGroups.find({}, {
		fields: {
			title: 1,
			label: 1,
			deprecated: 1
		}
	});
});

Meteor.publish('aQuestionsGroup', (questionGroupId) => {
	return QuestionsGroups.find({
		_id: questionGroupId
	});
});

Meteor.publish('aQuestionsGroupForAnEkloreQuestion', (ekloreQuestionId) => {
	const ekloreQuestion = EkloreQuestions.findOne({ _id: ekloreQuestionId });
	return QuestionsGroups.find({
		_id: ekloreQuestion.questionGroupId
	});
});
