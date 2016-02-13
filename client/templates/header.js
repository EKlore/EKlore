Template.header.helpers({
	myProfileActive() {
		if (Router.current().route._path === '/myProfile') {
			return 'active';
		} else {
			return false;
		}
	},
});
