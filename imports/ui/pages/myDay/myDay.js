import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Workshops } from '../../../api/workshops/schema.js';

import './myDay.jade';
import '../../components/connect/connect.js';

Template.myDay.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allWorkshopsForTheDay');
	});
});

Template.myDay.helpers({
	workshops() {
		return Workshops.find({}, {
			sort: {
				dateStart: 1,
				name: 1
			}
		});
	},
	dateStart() {
		return moment(this.dateStart).format('H:mm');
	},
	dateEnd() {
		return moment(this.dateEnd).format('H:mm');
	},
	isUserAlreadyIn() {
		if (lodash.findIndex(this.peopleToGo, ['userId', Meteor.userId()]) !== -1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.myDay.events({
	'click .goToWorkshop': function(event) {
		event.preventDefault();
		const data = {
			userId: Meteor.userId(),
			workshopId: this._id
		};
		Meteor.call('addUserToWorkshop', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click .removeFromWorkshop': function(event) {
		event.preventDefault();
		const data = {
			userId: Meteor.userId(),
			workshopId: this._id
		};
		Meteor.call('removeUserFromWorkshop', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
