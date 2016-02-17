class SignUpSignIn extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.userProfile = new ReactiveField({});
		this.questionProfile = new ReactiveField({});
		this.signUp = new ReactiveField(true);
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

	template() {
		return 'signUpSignIn';
	}

	events() {
		return super.events().concat({
			'click .previousQuestion': this.previousQuestion,
			'click .nextQuestion': this.nextQuestion
		});
	}

	nextQuestion() {
		this.userProfile().firstName = $('#firstName').val();
		this.userProfile().lastName = $('#lastName').val();
		this.userProfile().email = $('#email').val();
		this.userProfile().password = $('#password').val();
		if (this.userProfile().firstName && this.userProfile().lastName && this.userProfile().email && this.userProfile().password.length > 5 && this.userProfile().password === $('#confirmPassword').val()) {
			Accounts.createUser({
				username: this.userProfile().firstName.concat('_', this.userProfile().lastName),
				email: this.userProfile().email,
				password: this.userProfile().password,
				profile: {
					firstName: this.userProfile().firstName,
					lastName: this.userProfile().lastName
				}
			});
			this.questionLevel(this.questionLevel() + 1);
		} else {
			addErrorOrSuccess.call(this, 'firstName', '#firstName', 'question0ErrorFirstName', 'question0OKFirstName');
			addErrorOrSuccess.call(this, 'lastName', '#lastName', 'question0ErrorLastName', 'question0OKLastName');
			addErrorOrSuccessForEmail.call(this, 'email', '#email', 'question0ErrorEmail', 'question0OKEmail');
			addErrorOrSuccessForPassword.call(this, 'password', '#password', 'question0ErrorPassword', 'question0OKPassword');
			addErrorOrSuccessForConfirmPassword.call(this, 'password', '#confirmPassword', 'question0ErrorConfirmPassword', 'question0OKConfirmPassword');
		}
	}


	previousQuestion() {
		if (this.questionLevel() > 0) {
			this.questionLevel(this.questionLevel() - 1);
		}
	}
}

SignUpSignIn.register('SignUpSignIn');
