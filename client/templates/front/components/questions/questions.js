class Questions extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.question = new ReactiveField({});
	}

	onRendered() {
		$('#radioBtn a').first().removeClass('notActive').addClass('active');
		$('#radioBtn a').on('click', function() {
			for (var i = 0; i < $('#radioBtn a').length; i++) {
				console.log($('#radioBtn a').eq(i).data('title'));
			}
			var sel = $(this).data('title');
			var tog = $(this).data('toggle');
			$('#' + tog).prop('value', sel);
			$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
			$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
		});
	}

	template() {
		return 'questions';
	}

	choiceIndex() {
		if (this.currentData('@index') === 0) {
			return 'active';
		} else {
			return 'notActive';
		}
	}

	/*questionsAnswered() {
		console.log(Meteor.call('questionAnsweredCount', Meteor.userId(), function(error, result) {
			if (error) {
				return throwError(error.message);
			} else {
				return result;
			}
		}));
		return Meteor.call('questionAnsweredCount', Meteor.userId(), function(error, result) {
			if (error) {
				return throwError(error.message);
			} else {
				return result;
			}
		});
	}*/

	events() {
		return super.events().concat({
			'click #nextQuestion': this.saveAnswer,
			'click .radioBtn': this.selectChoice
		});
	}

	selectChoice(e) {
		var sel = $(e.target).data('title');
		var tog = $(e.target).data('toggle');
		$('#' + tog).prop('value', sel);
		$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
		$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
	}

	saveAnswer() {
		var choice = $('#fun').val();
		Meteor.call('saveAnswer', this.currentData().questionId, choice, function(error, result) {
			if (error) {
				return throwError(error.message);
			}
		});
	}
}

Questions.register('Questions');
