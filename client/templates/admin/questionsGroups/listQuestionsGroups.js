Template.listQuestionsGroups.helpers({
	questionsGroupsCount() {
		return QuestionsGroups.find({}).count();
	},
	questionsGroup() {
		return QuestionsGroups.find({}, {
			sort: {
				title: 1
			}
		});
	},
	ekloreQuestionsLinkedCount() {
		return EkloreQuestions.find({}).count();
	}
});
