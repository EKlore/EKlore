import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './newEkloreQuestion.jade';

Template.newEkloreQuestion.helpers({
	displayTypeScale() {
		if ($('input[name="displayType"]:checked').val() === 'scale') {
			return true;
		} else {
			return false;
		}
	},
	displayTypeYesNo() {
		if ($('input[name="displayType"]:checked').val() === 'yesNo') {
			return true;
		} else {
			return false;
		}
	},
	displayTypeQcm() {
		if ($('input[name="displayType"]:checked').val() === 'qcm') {
			return true;
		} else {
			return false;
		}
	}
});

Template.newEkloreQuestion.events({
	'click #addEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			title: $('#ekloreQuestionTitle').val(),
			level: Number($('#ekloreQuestionLevel').val())
		};
		if ($('input[name="displayType"]:checked').val() === 'text') {
			data.displayType = 'text';
		} else if ($('input[name="displayType"]:checked').val() === 'picture') {
			data.displayType = 'picture';
		}
		if (!data.title) {
			return Bert.alert('Title must be filled', 'danger', 'growl-top-right');
		}
		if (!data.displayType) {
			return Bert.alert('Display type must be filled', 'danger', 'growl-top-right');
		}
		if (data.level < 2) {
			return Bert.alert('The level must be superior to 1', 'danger', 'growl-top-right');
		}
		Meteor.call('addAnEkloreQuestion', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				Router.go('editEkloreQuestion', { _id: result });
			}
		});
	}
});