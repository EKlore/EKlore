Template.editQuestionsGroup.helpers({
	ekloreQuestionsLinked() {
		return EkloreQuestions.find({
			questionGroupId: this._id
		});
	}
});

Template.editQuestionsGroup.events({
	'click #save': function(event) {
		event.preventDefault();
		const questionsGroupData = {
			questionsGroupId: Router.current().params._id,
			title: $('#questionsGroupTitle').val(),
			label: $('#questionsGroupLabel').val(),
			level: Number($('#questionsGroupLevel').val())
		};
		if ($('input[name="deprecated"]:checked').val() === 'notDeprecated') {
			questionsGroupData.deprecated = false;
		} else if ($('input[name="deprecated"]:checked').val() === 'deprecated') {
			questionsGroupData.deprecated = true;
		}
		if (!questionsGroupData.title) {
			return throwError('Name must be filled');
		}
		if (!questionsGroupData.label) {
			return throwError('Label must be filled');
		}
		if (!questionsGroupData.level) {
			return throwError('Level must be filled');
		}
		if (questionsGroupData.level < 2) {
			return throwError('The level must be superior to 1');
		}
		Meteor.call('updateAQuestionsGroup', questionsGroupData, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				return throwError('Update succesful !');
			}
		});
	}
});
