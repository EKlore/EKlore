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

addErrorOrSuccessForPassword = function(property, element, templateError, templateOK) {
	if (!this.userProfile()[property] || this.userProfile()[property].length < 6) {
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

addErrorOrSuccessForConfirmPassword = function(property, verifElement, verifTemplateError, verifTemplateOK) {
	if (this.userProfile()[property] !== $(verifElement).val()) {
		if ($(verifElement).parents('.form-group').hasClass('has-success')) {
			$(verifElement).parents('.form-group').removeClass('has-success').removeClass('has-feedback');
			$('.' + verifTemplateOK).remove();
		}
		if (!$(verifElement).parents('.form-group').hasClass('has-error')) {
			$(verifElement).parents('.form-group').addClass('has-error').addClass('has-feedback');
			$(verifElement).parent().append(function() {
				return Blaze.toHTML(Template[verifTemplateError]);
			});
		}
	} else {
		if (this.userProfile()[property].length > 5) {
			console.log(this.userProfile()[property].length > 5, this.userProfile()[property].length);
			if ($(verifElement).parents('.form-group').hasClass('has-error')) {
				$(verifElement).parents('.form-group').removeClass('has-error').removeClass('has-feedback');
				$('.' + verifTemplateError).remove();
			}
			if (!$(verifElement).parents('.form-group').hasClass('has-success')) {
				$(verifElement).parents('.form-group').addClass('has-success').addClass('has-feedback');
				$(verifElement).parent().append(function() {
					return Blaze.toHTML(Template[verifTemplateOK]);
				});
			}
		}
	}
}
