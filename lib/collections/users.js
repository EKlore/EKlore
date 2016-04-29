Meteor.users.helpers({
	questionsCount() {
		return UserQuestions.find({ userId: this._id }).count();
	},
	questionsNotAnsweredCount() {
		return UserQuestions.find({ userId: this._id, answered: false }).count();
	}
});

Meteor.methods({
	addQuestionsGroup(data) {
		check(data, Object);
		check(data.userId, String);
		check(data.questionsGroupId, String);
		return Meteor.users.update({ _id: data.userId }, {
			$addToSet: {
				'profile.questionsGroups': data.questionsGroupId
			}
		});
	}
});
