Meteor.publish('oneQuestionAtATime', function(userId) {
	return Questions.findOne({
		userId: userId,
		answered: false,
		deprecated: false
	}, {
		sort: {
			level: 1,
			version: 1
		}
	});
});
