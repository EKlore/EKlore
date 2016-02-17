class Questions extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.question = new ReactiveField({});
	}

	questionData() {
		return UserQuestions.findOne({
			userId: Meteor.userId(),
			answered: false,
			deprecated: false
		}, {
			sort: {
				level: 1,
				version: 1
			}
		}).fetch();
	}

	template() {
		return 'questions';
	}

	events() {
		return super.events().concat({});
	}

}

Questions.register('Questions');
