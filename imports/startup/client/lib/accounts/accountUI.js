import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
	/*requestPermissions: {
		facebook: ['user_likes']
	},
	requestOfflineToken: {
		google: true
	},*/
	passwordSignupFields: 'EMAIL_ONLY'
});
