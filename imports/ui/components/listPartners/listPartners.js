import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Partners } from '../../../api/partners/schema.js';

import './listPartners.jade';

Template.listPartners.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allPartners');
	});
});

Template.listPartners.helpers({
	partnersCount() {
		return Partners.find({}).count();
	},
	partners() {
		return Partners.find({}, {
			fields: {
				firstName: 1,
				lastName: 1,
				companyName: 1,
				picture: 1
			}
		});
	},
	myIndex(index) {
		return index + 1;
	}
});
