Template.newEkloreQuestion.helpers({
	universes: function() {
			return Universes.find({}, {
				sort: {
					name: 1
				}
			});
		}
		/*player1List() {
			var list = _.uniq(Meteor.users.find({}, {
				sort: {
					'profile.firstName': 1,
					'profile.lastName': 1
				},
				fields: {
					'_id': 1,
					'profile.firstName': 1,
					'profile.lastName': 1
				}
			}).fetch().map(function(x) {
				return x;
			}), true);
			list.sort(function(a, b) {
				if (a.fullName > b.fullName) {
					return 1;
				}
				if (a.fullName < b.fullName) {
					return -1;
				}
				return 0;
			});
			return list;
		}*/
});

Template.newEkloreQuestion.events({
	'click #addQuestionsGroup': function(event) {
		event.preventDefault();
		var questionsGroup = {
			title: $('#questionsGroupTitle').val(),
			label: $('#questionsGroupLabel').val(),
			level: Number($('#questionsGroupLevel').val())
		};
		if (!questionsGroup.title) {
			return throwError('Title must be filled');
		}
		if (!questionsGroup.label) {
			return throwError('Label must be filled');
		}
		if (!questionsGroup.level) {
			return throwError('Level must be filled');
		}
		if (questionsGroup.level < 2) {
			return throwError('The level must be superior to 1');
		}
		Meteor.call('addAQuestionsGroup', questionsGroup, function(error, result) {
			if (error) {
				return throwError(error.message);
			} else {
				Router.go('admin');
			}
		});
	},
	'submit .addUniverseToEkloreQuestion': function(event) {
		event.preventDefault();
		if ($(event.target).find('.btn').hasClass('btn-success')) {
			$(event.target).find('.btn').removeClass('btn-success').addClass('btn-danger');
		} else if ($(event.target).find('.btn').hasClass('btn-danger')) {
			$(event.target).find('.btn').removeClass('btn-danger').addClass('btn-success');
		}
	}
});
