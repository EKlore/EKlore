Template.admin.helpers({
	isAdmin() {
		if (Meteor.user().profile.admin) {
			return true;
		} else {
			return false;
		}
	},
	universesCount() {
		return Universes.find({}).count();
	},
	universe() {
		return Universes.find({});
	},
	workshopsCount() {
		return Workshops.find({}).count();
	},
	workshop() {
		return Workshops.find({});
	},
});
