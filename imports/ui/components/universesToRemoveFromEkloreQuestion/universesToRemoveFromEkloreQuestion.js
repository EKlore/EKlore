import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Universes } from '../../../api/universes/schema.js';

import './universesToRemoveFromEkloreQuestion.jade';

Template.universesToRemoveFromEkloreQuestion.helpers({
	universeData() {
		return Universes.findOne(this.universeId);
	}
});

Template.universesToRemoveFromEkloreQuestion.events({
	'submit .removeUniverseFromEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			universeId: this.universeId
		};
		Meteor.call('removeUniverseFromEkloreQuestion', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
