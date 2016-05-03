Template.answerQuestions.helpers({
	questionData() {
		return UserQuestions.findOne({
			userId: Meteor.userId(),
			deprecated: false,
			answered: false
		}, {
			sort: {
				level: 1
			}
		});
	}
});

Template.answerQuestions.events({
	'click #validateChoice': function(event) {
		event.preventDefault();
		const data = {
			userQuestionId: this._id,
			choiceSelected: $('input[name="choicesForQuestion"]:checked').val()
		};
		if (!data.choiceSelected) {
			return throwError('You must choose an answer !');
		}
		Meteor.call('answerQuestion', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				$('input[name="choicesForQuestion"]:checked').removeAttr('checked');
			}
		});
	}
});
