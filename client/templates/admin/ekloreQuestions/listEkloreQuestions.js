Template.listEkloreQuestions.helpers({
	ekloreQuestionsCount: function() {
		return EkloreQuestions.find({}).count();
	},
	questionsGroup: function() {
		return EkloreQuestions.find({}, {
			sort: {
				createdAt: 1
			}
		});
	},
	userQuestionsLinkedCount: function() {
		return UserQuestions.find({
			questionId: this._id
		}).count();
	}
});
