import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Partners } from '../../../api/partners/schema.js';

import './partners.jade';

Template.partners.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allPartners');
	});
});

Template.partners.helpers({
	partners() {
		return Partners.find({});
	}
});

Template.partners.events({});
