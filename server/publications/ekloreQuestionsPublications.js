Meteor.publish('allEkloreQuestions', () => {
	return EkloreQuestions.find({}, {
		fields: {
			title: 1,
			version: 1,
			displayType: 1,
			questionGroupId: 1
		}
	});
});

Meteor.publish('anEkloreQuestion', (ekloreQuestionId) => {
	return EkloreQuestions.find({ _id: ekloreQuestionId });
});

Meteor.publish('ekloreQuestionsLinkedToQuestionsGroup', (questionGroupId) => {
	return EkloreQuestions.find({ questionGroupId }, {
		fields: {
			title: 1,
			questionGroupId: 1
		}
	});
});
