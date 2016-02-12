class MyProfile extends BlazeComponent {
	template() {
		return 'myProfile';
	}

	events() {
		return super.events().concat({
			'click .previousQuestion': this.previousQuestion,
			'click .nextQuestion': this.nextQuestion
		});
	}

	onCreated() {
		this.questionLevel = new ReactiveField(0);
	}

	nextQuestion() {
		this.questionLevel(this.questionLevel + 1);
		console.log(this.questionLevel());
		return this.questionLevel();
	}

	previousQuestion() {
		if (this.questionLevel > 0) {
			this.questionLevel(this.questionLevel - 1);
			console.log(this.questionLevel());
			return this.questionLevel();
		}
		console.log(this.questionLevel());
		return false;
	}
}

MyProfile.register('MyProfile');
