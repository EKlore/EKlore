Meteor.publish('allEkloreQuestions', () => {
	return EkloreQuestions.find({}, {
		fields: {
			title: 1
		}
	});
});

Meteor.publish('anEkloreQuestion', (ekloreQuestionId) => {
	return EkloreQuestions.find({ _id: ekloreQuestionId });
});
