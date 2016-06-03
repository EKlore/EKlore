import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import { Workshops } from '../../../api/workshops/schema.js';

import './workshopsToRemoveFromEkloreQuestion.jade';

Template.workshopsToRemoveFromEkloreQuestion.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.workshopsToRemoveFromEkloreQuestion.events({
	'submit .removeWorkshopFromEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			workshopId: this.workshopId
		};
		Meteor.call('removeWorkshopFromEkloreQuestion', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
