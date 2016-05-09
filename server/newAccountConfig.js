Accounts.onCreateUser((options, user) => {
	// We still want the default hook's 'profile' behavior.
	if (options.profile) {
		user.profile = options.profile;
		user.profile.admin = false;
	} else {
		user.profile = {
			firstName: '',
			lastName: '',
			admin: false,
			questionsGroups: []
		};
	}
	return user;
});
