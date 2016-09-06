import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import 'meteor/ian:accounts-ui-bootstrap-3';

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
	seeUniversesActive() {
		if (Router.current().route._path === '/universes') {
			return 'active';
		} else {
			return false;
		}
	}
});
