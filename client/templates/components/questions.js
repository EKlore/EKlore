class Questions extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.questionLevel = new ReactiveField(0);
	}

	question0() {
		if (this.questionLevel() === 0) {
			return false;
		} else {
			return 'hidden';
		}
	}

	question1() {
		if (this.questionLevel() === 1) {
			return false;
		} else {
			return 'hidden';
		}
	}

	question2() {
		if (this.questionLevel() === 2) {
			return false;
		} else {
			return 'hidden';
		}
	}

	question3() {
		if (this.questionLevel() === 3) {
			return false;
		} else {
			return 'hidden';
		}
	}

	question4() {
		if (this.questionLevel() === 4) {
			return false;
		} else {
			return 'hidden';
		}
	}

	question5() {
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
