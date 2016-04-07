Meteor.publish('oneQuestionAtATime', (userID) => {
	return UserQuestions.find({
		userId: userID,
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
