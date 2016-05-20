Template.editQuestionsGroup.helpers({
	ekloreQuestionsLinked() {
		return EkloreQuestions.find({ questionsGroupId: this._id });
	}
});

Template.editQuestionsGroup.events({
	'click #save': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: Router.current().params._id,
			title: $('#questionsGroupTitle').val(),
			label: $('#questionsGroupLabel').val(),
			level: Number($('#questionsGroupLevel').val())
		};
		if ($('input[name="deprecated"]:checked').val() === 'notDeprecated') {
			data.deprecated = false;
		} else if ($('input[name="deprecated"]:checked').val() === 'deprecated') {
			data.deprecated = true;
		}
		if (!data.title) {
			return throwError('Title must be filled');
		}
		if (!data.label) {
			return throwError('Label must be filled');
		}
		if (!data.level) {
			return throwError('Level must be filled');
		}
		if (data.level < 2) {
			return throwError('The level must be superior to 1');
		}
		Meteor.call('updateAQuestionsGroup', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				return throwError('Update succesful !');
			}
		});
	}
});
