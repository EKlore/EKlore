class Questions extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.questionLevel = new ReactiveField(0);
	}

	onRendered() {
		$('#radioBtn a').on('click', function() {
			var sel = $(this).data('title');
			var tog = $(this).data('toggle');
			$('#' + tog).prop('value', sel);
			$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
			$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
		});
	}

	level0() {
		if (this.questionLevel() === 0) {
			return false;
		} else {
			return 'hidden';
		}
	}

	level1() {
		if (this.questionLevel() === 1) {
			return false;
		} else {
			return 'hidden';
		}
	}

	level2() {
		if (this.questionLevel() === 2) {
			return false;
		} else {
			return 'hidden';
		}
	}

	level3() {
		if (this.questionLevel() === 3) {
			return false;
		} else {
			return 'hidden';
		}
	}

	level4() {
		if (this.questionLevel() === 4) {
			return false;
		} else {
			return 'hidden';
		}
	}

	level5() {
		if (this.questionLevel() === 5) {
			return false;
		} else {
			return 'hidden';
		}
	}

	template() {
		return 'questions';
	}

	events() {
		return super.events().concat({
			'click .previousQuestion': this.previousQuestion,
			'click .nextQuestion': this.nextQuestion
		});
	}

	nextQuestion() {
		this.questionLevel(this.questionLevel() + 1);
	}

	previousQuestion() {
		if (this.questionLevel() > 0) {
			this.questionLevel(this.questionLevel() - 1);
		}
	}
}

Questions.register('Questions');
