import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import { lodash } from 'meteor/stevezhu:lodash';

import { Universes } from '../../../api/universes/schema.js';

import './universesToRemoveFromChoice.jade';

Template.universesToRemoveFromChoice.helpers({
	universeData() {
		return Universes.findOne(this.universeId);
	}
});

Template.universesToRemoveFromChoice.events({
	'submit .removeUniverseFromChoice': function(event) {
		event.preventDefault();
		const data = {
			choiceId: Template.parentData(1).choiceId,
			ekloreQuestionId: Router.current().params._id,
			universeId: this.universeId
		};
		data.choiceIndex = lodash.findIndex(Template.parentData(2).choices, ['choiceId', data.choiceId]);
		Meteor.call('removeUniverseFromChoice', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
