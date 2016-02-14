class Questions extends BlazeComponent {
	onCreated() {
		super.onCreated();
		this.questionLevel = new ReactiveField(0);
		this.userProfile = new ReactiveField({});
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
		if (this.questionLevel() === 0) {
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
				if (!this.userProfile().firstName) {
					$('#firstName').parents('.form-group').removeClass('has-success');
					if (!$('#firstName').parents('.form-group').hasClass('has-error')) {
						$('#firstName').parents('.form-group').addClass('has-error').addClass('has-feedback');
						$('#firstName').parent().append(function() {
							return Blaze.toHTML(Template.question0ErrorFirstName);
						});
					}
				} else {
					if ($('#firstName').parents('.form-group').hasClass('has-error')) {
						$('#firstName').parents('.form-group').removeClass('has-error');
						$(".question0ErrorFirstName").remove();
						$('#firstName').parents('.form-group').addClass('has-success').addClass('has-feedback');
						$('#firstName').parent().append(function() {
							return Blaze.toHTML(Template.question0OKFirstName);
						});
					} else {
						$('#firstName').parents('.form-group').addClass('has-success').addClass('has-feedback');
						$('#firstName').parent().append(function() {
							return Blaze.toHTML(Template.question0OKFirstName);
						});
					}
				}
				if (!this.userProfile().lastName) {
					$('#lastName').parents('.form-group').addClass('has-error');
					$('#lastName').parent().append(function() {
						return Blaze.toHTML(Template.question0ErrorLastName);
					});
				}
				if (!this.userProfile().email || this.userProfile().email.match(' /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;')) {
					$('#email').parents('.form-group').addClass('has-error');
					$('#email').parent().append(function() {
						return Blaze.toHTML(Template.question0ErrorEmail);
					});
				}
			}
		} else {}
	}

	previousQuestion() {
		if (this.questionLevel() > 0) {
			this.questionLevel(this.questionLevel() - 1);
		}
	}
}

Questions.register('Questions');
