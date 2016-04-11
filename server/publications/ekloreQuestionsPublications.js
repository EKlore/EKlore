Meteor.publish('allEkloreQuestions', () => {
	return EkloreQuestions.find({
		deprecated: false
	}, {
		fields: {
			title: 1,
		}
	});
});

Meteor.publish('anEkloreQuestion', (ekloreQuestionId) => {
	return EkloreQuestions.find({ _id: ekloreQuestionId });
});
