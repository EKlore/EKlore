import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './newUniverse.jade';

Template.newUniverse.events({
	'click #addUniverse': function(event) {
		event.preventDefault();
		const data = {
			name: $('#universeName').val(),
			label: $('#universeLabel').val()
		};
		if (!data.name) {
			return Bert.alert('Name must be filled', 'danger', 'growl-top-right');
		}
		if (!data.label) {
			return Bert.alert('Label must be filled', 'danger', 'growl-top-right');
		}
		Meteor.call('addAUniverse', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				Router.go('editUniverse', { _id: result });
			}
		});
	}
});
