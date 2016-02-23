Meteor.users.helpers({
	questionsCount() {
		return UserQuestions.find({ userId: this._id }).count();
	},
	questionsNotAnsweredCount() {
		return UserQuestions.find({ userId: this._id, answered: false }).count();
	}
});
