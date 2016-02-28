Template.newEkloreQuestion.events({
	'click #addQuestionsGroup': function(e) {
		e.preventDefault();
		var questionsGroup = {
			title: $('#questionsGroupTitle').val(),
			label: $('#questionsGroupLabel').val(),
			level: Number($('#questionsGroupLevel').val())
		};
		if (!questionsGroup.title) {
			return throwError('Title must be filled');
		}
		if (!questionsGroup.label) {
			return throwError('Label must be filled');
		}
		if (!questionsGroup.level) {
			return throwError('Level must be filled');
		}
		if (questionsGroup.level < 2) {
			return throwError('The level must be superior to 1');
		}
		Meteor.call('addAQuestionsGroup', questionsGroup, function(error, result) {
			if (error) {
				return throwError(error.message);
			} else {
				Router.go('admin');
			}
		});
	}
});
