import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';
import 'meteor/sacha:spin';

import { Workshops } from '../../../api/workshops/schema.js';
import { Partners } from '../../../api/partners/schema.js';

import './workshopDetails.jade';

Template.workshopDetails.onCreated(function() {
	this.autorun(() => {
		this.subscribe('aWorkshop', Router.current().params._id);
		this.subscribe('allPartnersForWorkshop', Router.current().params._id);
	});
});

Template.workshopDetails.helpers({
	workshop() {
		return Workshops.findOne({ _id: Router.current().params._id });
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
	},
	partners() {
		return Partners.find({
			workshopsLinked: {
				workshopId: Router.current().params._id
			}
		});
	}
});

Template.workshopDetails.events({
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
