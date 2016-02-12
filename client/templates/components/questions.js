class Questions extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.questionLevel = new ReactiveField(0);
	}

	onRendered() {
		super.onRendered();
		$('select').material_select();
	}

	question0() {
		if (this.questionLevel() === 0) {
			return false;
		} else {
			return 'hide';
		}
	}

	question1() {
		if (this.questionLevel() === 1) {
			return false;
		} else {
			return 'hide';
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
