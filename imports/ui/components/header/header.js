import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import './header.jade';

Template.header.helpers({
	myProfileActive() {
		if (Router.current().route._path === '/myProfile') {
			return 'active';
		} else {
			return false;
		}
	},
	myDayActive() {
		if (Router.current().route._path === '/myDay') {
			return 'active';
		} else {
			return false;
		}
	},
	meetingActive() {
		if (Router.current().route._path === '/meeting') {
			return 'active';
		} else {
			return false;
		}
	}
});
