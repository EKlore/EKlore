Meteor.publish('tenQuestionAtATime', (userId) => {
	return UserQuestions.find({
		userId: userId,
		answered: false,
		deprecated: false
	}, {
		sort: {
			level: 1
		},
		limit: 10
	});
});

Meteor.publish('userQuestionsNotAnswered', (userId) => {
	return UserQuestions.find({
		userId,
		answered: false,
		deprecated: false
	}, {
		fields: {
			userId: 1,
			answered: 1,
			deprecated: 1
		}
	});
});
