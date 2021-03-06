import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './newPartner.jade';

Template.newPartner.events({
	'click #addPartner': function(event) {
		event.preventDefault();
		const data = {
			firstName: $('#partnerFirstName').val(),
			lastName: $('#partnerLastName').val(),
			companyName: $('#partnerCompanyName').val(),
			description: $('#partnerDescription').val()
		};
		Meteor.call('addAPartner', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				Router.go('editPartner', { _id: result });
			}
		});
	}
});
