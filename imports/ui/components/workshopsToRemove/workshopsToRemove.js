import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';

import { Workshops } from '../../../api/workshops/schema.js';

import './workshopsToRemove.jade';

Template.workshopsToRemove.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.workshopsToRemove.events({
	'submit .removeWorkshopFromUniverse': function(event) {
		event.preventDefault();
		const data = {
			universeId: Router.current().params._id,
			workshopId: this.workshopId
		};
		Meteor.call('removeWorkshopFromUniverse', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				Meteor.call('removeUniverseFromWorkshop', data, (error) => {
					if (error) {
						return Bert.alert(error.message, 'danger', 'growl-top-right');
					}
				});
			}
		});
	}
});
