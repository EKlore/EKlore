Template.header.helpers({
	myProfileActive: function() {
		if (Router.current().route._path === '/myProfile') {
			return 'active';
		} else {
			return false;
		}
	},
	myDayActive: function() {
		if (Router.current().route._path === '/myDay') {
			return 'active';
		} else {
			return false;
		}
	},
	meetingActive: function() {
		if (Router.current().route._path === '/meeting') {
			return 'active';
		} else {
			return false;
		}
	}
});
