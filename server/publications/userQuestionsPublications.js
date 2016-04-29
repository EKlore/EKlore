Meteor.publish('oneQuestionAtATime', (userId) => {
	return UserQuestions.find({
		userId,
		answered: false,
		deprecated: false
	}, {
		sort: {
			level: 1,
			version: 1
		},
		limit: 1
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
