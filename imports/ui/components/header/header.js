import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import 'meteor/ian:accounts-ui-bootstrap-3';

import './header.jade';
import '../connectButton/connectButton.js';

Template.header.helpers({
	myProfileActive() {
		if (Router.current().route._path === '/myProfile') {
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
	},
	myDayActive() {
		if (Router.current().route._path === '/myDay') {
			return 'active';
		} else {
			return false;
		}
	},
	volunteersActive() {
		if (Router.current().route._path === '/volunteers') {
			return 'active';
		} else {
			return false;
		}
	}
});

Template.header.events({
	'click .navbar-brand': function(event) {
		if ($('#ekloreNavbar').hasClass('in')) {
			return $('#ekloreNavbar').removeClass('in');
		}
	}
});
