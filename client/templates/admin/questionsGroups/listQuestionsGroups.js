Template.listQuestionsGroups.helpers({
	questionsGroupsCount: function() {
		return QuestionsGroups.find({}).count();
	},
	questionsGroup: function() {
		return QuestionsGroups.find({}, {
			sort: {
				title: 1
			}
		});
	},
	ekloreQuestionsLinkedCount: function() {
		return EKloreQuestions.find({}).count();
	}
});
