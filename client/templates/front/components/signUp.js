Template.signUp.events({
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
	}
});
