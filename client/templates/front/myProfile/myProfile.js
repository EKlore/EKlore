Template.myProfile.helpers({
	questionsGroup() {
		return QuestionsGroups.find({ deprecated: false }, {
			sort: {
				title: 1
			},
			fields: {
				deprecated: 1,
				title: 1,
				label: 1
			}
		});
	},
	universes() {
		return Universes.find({}, {
			sort: {
				name: 1
			},
			fields: {
				name: 1
			}
		});
	},
	perc() {
		return Math.ceil(Math.random() * 100);
	}
});

Template.myProfile.events({
	'click .addQuestionsGroupToUser': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: this._id,
			userId: Meteor.userId()
		};
		Meteor.call('addQuestionsGroupToUser', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	},
	'submit .createNewUser': function(event) {
		event.preventDefault();
		const data = {
			username: $(event.target).find('#createPseudo').val(),
			email: $(event.target).find('#createEmail').val(),
			password: $(event.target).find('#createPassword').val()
		};
		check(data.username, String);
		check(data.email, String);
		check(data.password, String);
		Accounts.createUser(data);
	},
	'submit .userLogIn': function(event) {
		event.preventDefault();
		check($(event.target).find('#signInEmail').val(), String);
		check($(event.target).find('#singInPassword').val(), String);
		Meteor.loginWithPassword($(event.target).find('#signInEmail').val(), $(event.target).find('#singInPassword').val());
	}
});
