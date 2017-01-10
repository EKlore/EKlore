import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Partners } from '../../../api/partners/schema.js';
import { Universes } from '../../../api/universes/schema.js';
import { Workshops } from '../../../api/workshops/schema.js';

import './editPartner.jade';

Template.editPartner.onCreated(function() {
	this.autorun(() => {
		this.subscribe('Partners.aPartner', Router.current().params._id);
		this.subscribe('Partners.allUniverses');
		this.subscribe('Partners.allWorkshops');
	});
});

Template.editPartner.helpers({
	partner() {
		return Partners.findOne({ _id: Router.current().params._id });
	},
	workshops() {
		if (!this.workshopsLinked || this.workshopsLinked.length === 0) {
			return Workshops.find({}, {
				fields: {
					name: 1
				}
			});
		} else {
			let qStart = { _id: { $nin: [] } };
			this.workshopsLinked.map((cur) => {
				return qStart._id['$nin'].push(cur.workshopId);
			});
			return Workshops.find(qStart, {
				fields: {
					name: 1
				}
			});
		}
	},
	universes() {
		if (!this.universesLinked || this.universesLinked.length === 0) {
			return Universes.find({}, {
				fields: {
					name: 1
				}
			});
		} else {
			let qStart = { _id: { $nin: [] } };
			this.universesLinked.map((cur) => {
				return qStart._id['$nin'].push(cur.universeId);
			});
			return Universes.find(qStart, {
				fields: {
					name: 1
				}
			});
		}
	}
});

Template.universesToRemoveFromPartner.helpers({
	universeData() {
		return Universes.findOne(this.universeId);
	}
});

Template.workshopsToRemoveFromPartner.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.editPartner.events({
	'click #save': function(event) {
		event.preventDefault();
		const data = {
			partnerId: Router.current().params._id,
			firstName: $('#partnerFirstName').val(),
			lastName: $('#partnerLastName').val(),
			companyName: $('#partnerCompanyName').val(),
			description: $('#partnerDescription').val(),
			pictureUrl: $('#partnerPictureUrl').val(),
			website: $('#partnerWebsite').val()
		};
		Meteor.call('Partners.updateAPartner', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	}
});

Template.universesToRemoveFromPartner.events({
	'click button': function(event) {
		event.preventDefault();
		const data = {
			partnerId: Router.current().params._id,
			universeId: this.universeId
		};
		Meteor.call('Partners.removeUniverseFromPartner', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});

Template.universesToAddToPartner.events({
	'click button': function(event) {
		event.preventDefault();
		const data = {
			partnerId: Router.current().params._id,
			universeId: this._id
		};
		Meteor.call('Partners.addUniverseToPartner', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});

Template.workshopsToRemoveFromPartner.events({
	'click button': function(event) {
		event.preventDefault();
		const data = {
			partnerId: Router.current().params._id,
			workshopId: this.workshopId
		};
		Meteor.call('Partners.removeWorkshopFromPartner', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});

Template.workshopsToAddToPartner.events({
	'click button': function(event) {
		event.preventDefault();
		const data = {
			partnerId: Router.current().params._id,
			workshopId: this._id
		};
		Meteor.call('Partners.addWorkshopToPartner', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
