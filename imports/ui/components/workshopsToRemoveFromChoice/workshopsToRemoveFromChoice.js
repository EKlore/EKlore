import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { lodash } from 'meteor/stevezhu:lodash';
import { Bert } from 'meteor/themeteorchef:bert';

import { Workshops } from '../../../api/workshops/schema.js';

import './workshopsToRemoveFromChoice.jade';

Template.workshopsToRemoveFromChoice.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.workshopsToRemoveFromChoice.events({
	'submit .removeWorkshopFromChoice': function(event) {
		event.preventDefault();
		const data = {
			choiceId: Template.parentData(1).choiceId,
			ekloreQuestionId: Router.current().params._id,
			workshopId: this.workshopId
		};
		data.choiceIndex = lodash.findIndex(Template.parentData(2).choices, ['choiceId', data.choiceId]);
		Meteor.call('removeWorkshopFromChoice', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
