Template.listEkloreQuestions.helpers({
	ekloreQuestionsCount() {
		return EkloreQuestions.find({}).count();
	},
	questionsGroup() {
		return EkloreQuestions.find({}, {
			sort: {
				createdAt: 1
			}
		});
	},
	userQuestionsLinkedCount() {
		return UserQuestions.find({
			questionId: this._id
		}).count();
	}
});
