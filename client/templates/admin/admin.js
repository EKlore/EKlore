Template.admin.helpers({
	isAdmin() {
		if (Meteor.user().profile.admin) {
			return true;
		} else {
			return false;
		}
	}
});
