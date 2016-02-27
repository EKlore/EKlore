Template.admin.helpers({
	isAdmin: function() {
		if (Meteor.user().profile.admin) {
			return true;
		} else {
			return false;
		}
	}
});
