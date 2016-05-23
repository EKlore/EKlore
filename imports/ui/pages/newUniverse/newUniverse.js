import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import './newUniverse.jade';

Template.newUniverse.events({
	'click #addUniverse': function(event) {
		event.preventDefault();
		const universe = {
			name: $('#universeName').val(),
			label: $('#universeLabel').val()
		};
		if (universe.name && universe.label) {
			Meteor.call('addAUniverse', universe, (error, result) => {
				if (error) {
					return error.message;
				} else {
					Router.go('editUniverse', { _id: result });
				}
			});
		}
	}
});
