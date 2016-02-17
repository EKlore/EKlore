class Questions extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.question = new ReactiveField({});
	}

	onRendered() {
		$('#radioBtn a').first().removeClass('notActive').addClass('active');
		$('#radioBtn a').on('click', function() {
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

	events() {
		return super.events().concat({});
	}

}

Questions.register('Questions');
