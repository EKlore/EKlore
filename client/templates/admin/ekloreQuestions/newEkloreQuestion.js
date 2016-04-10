Template.newEkloreQuestion.helpers({});

Template.newEkloreQuestion.events({
	'click #addEkloreQuestion': function(event) {
		event.preventDefault();
		var ekloreQuestion = {
			title: $('#ekloreQuestionTitle').val(),
			level: Number($('#ekloreQuestionLevel').val())
		};
		if ($('input[name="displayType"]:checked').val() === 'text') {
			ekloreQuestion.displayType = 'text';
		} else if ($('input[name="displayType"]:checked').val() === 'picture') {
			ekloreQuestion.displayType = 'picture';
		}
		if (!ekloreQuestion.title) {
			return throwError('Title must be filled');
		}
		if (!ekloreQuestion.displayType) {
			return throwError('Display type must be defined');
		}
		if (ekloreQuestion.level < 2) {
			return throwError('The level must be superior to 1');
		}
		Meteor.call('addAnEkloreQuestion', ekloreQuestion, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				Router.go('admin');
			}
		});
	}
});
