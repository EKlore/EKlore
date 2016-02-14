addErrorOrSuccess = function(property, element, templateError, templateOK) {
	if (!this.userProfile()[property]) {
		if ($(element).parents('.form-group').hasClass('has-success')) {
			$(element).parents('.form-group').removeClass('has-success').removeClass('has-feedback');
			$('.' + templateOK).remove();
		}
		if (!$(element).parents('.form-group').hasClass('has-error')) {
			$(element).parents('.form-group').addClass('has-error').addClass('has-feedback');
			$(element).parent().append(function() {
				return Blaze.toHTML(Template[templateError]);
			});
		}
	} else {
		if ($(element).parents('.form-group').hasClass('has-error')) {
			$(element).parents('.form-group').removeClass('has-error').removeClass('has-feedback');
			$('.' + templateError).remove();
		}
		if (!$(element).parents('.form-group').hasClass('has-success')) {
			$(element).parents('.form-group').addClass('has-success').addClass('has-feedback');
			$(element).parent().append(function() {
				return Blaze.toHTML(Template[templateOK]);
			});
		}
	}
};

addErrorOrSuccessForEmail = function(property, element, templateError, templateOK) {
	if (!this.userProfile()[property]) {
		if ($(element).parents('.form-group').hasClass('has-success')) {
			$(element).parents('.form-group').removeClass('has-success').removeClass('has-feedback');
			$('.' + templateOK).remove();
		}
		if (!$(element).parents('.form-group').hasClass('has-error')) {

			$(element).parents('.form-group').addClass('has-error').addClass('has-feedback');
			$(element).parent().append(function() {
				return Blaze.toHTML(Template[templateError]);
			});
		}
	} else {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(this.userProfile()[property])) {
			if ($(element).parents('.form-group').hasClass('has-success')) {
				$(element).parents('.form-group').removeClass('has-success').removeClass('has-feedback');
				$('.' + templateOK).remove();
			}
			if (!$(element).parents('.form-group').hasClass('has-error')) {
				$(element).parents('.form-group').addClass('has-error').addClass('has-feedback');
				$(element).parent().append(function() {
					return Blaze.toHTML(Template[templateError]);
				});
			}
		} else {

			if ($(element).parents('.form-group').hasClass('has-error')) {
				$(element).parents('.form-group').removeClass('has-error').removeClass('has-feedback');
				$('.' + templateError).remove();
			}
			if (!$(element).parents('.form-group').hasClass('has-success')) {
				$(element).parents('.form-group').addClass('has-success').addClass('has-feedback');
				$(element).parent().append(function() {
					return Blaze.toHTML(Template[templateOK]);
				});
			}
		}
	}
};
