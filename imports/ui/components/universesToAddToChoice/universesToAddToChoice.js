import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './universesToAddToChoice.jade';

Template.universesToAddToChoice.events({
	'submit .addUniverseToChoice': function(event) {
		event.preventDefault();
		const data = {
			choiceId: Template.parentData(1).choiceId,
			ekloreQuestionId: Router.current().params._id,
			universeId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		data.choiceIndex = lodash.findIndex(Template.parentData(2).choices, ['choiceId', data.choiceId]);
		if (!data.matchingPower) {
			return Bert.alert('The matching power of the universe must be filled', 'danger', 'growl-top-right');
		}
		if (data.matchingPower <= 0) {
			return Bert.alert('The matching power of the universe must be superior to 0', 'danger', 'growl-top-right');
		} else if (data.matchingPower > 1) {
			return Bert.alert('The matching power of the universe must be inferior to 1', 'danger', 'growl-top-right');
		}
		Meteor.call('addUniverseToChoice', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
