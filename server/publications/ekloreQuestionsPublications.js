Meteor.publish('allEkloreQuestions', () => {
	return EkloreQuestions.find({}, {
		fields: {
			title: 1,
			version: 1,
			displayType: 1,
			questionsGroupId: 1
		}
	});
});

Meteor.publish('anEkloreQuestion', (ekloreQuestionId) => {
	return EkloreQuestions.find({ _id: ekloreQuestionId });
});

Meteor.publish('ekloreQuestionsLinkedToQuestionsGroup', (questionsGroupId) => {
	return EkloreQuestions.find({ questionsGroupId: questionsGroupId }, {
		fields: {
			title: 1,
			questionsGroupId: 1,
			deprecated: 1
		}
	});
});
