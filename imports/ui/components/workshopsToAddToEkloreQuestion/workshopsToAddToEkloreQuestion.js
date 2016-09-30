import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './workshopsToAddToEkloreQuestion.jade';

Template.workshopsToAddToEkloreQuestion.events({
	'submit .addWorkshopToEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			workshopId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		if (!data.matchingPower) {
			return Bert.alert('The matching power of the workshop must be filled', 'danger', 'growl-top-right');
		}
		if (data.matchingPower <= 0) {
			return Bert.alert('The matching power of the workshop must be superior to 0', 'danger', 'growl-top-right');
		} else if (data.matchingPower > 1) {
			return Bert.alert('The matching power of the workshop must be inferior to 1', 'danger', 'growl-top-right');
		}
		Meteor.call('addWorkshopToEkloreQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
