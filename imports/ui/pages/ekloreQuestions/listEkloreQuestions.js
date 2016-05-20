Template.listEkloreQuestions.helpers({
	ekloreQuestionsCount() {
		return EkloreQuestions.find({}).count();
	},
	ekloreQuestions() {
		return EkloreQuestions.find({}, {
			sort: {
				title: 1
			}
		});
	}
});
