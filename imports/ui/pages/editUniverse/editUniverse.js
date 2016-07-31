import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Universes } from '../../../api/universes/schema.js';
import { Workshops } from '../../../api/workshops/schema.js';

import './editUniverse.jade';
import '../../components/workshopsToAdd/workshopsToAdd.js';
import '../../components/workshopsToRemove/workshopsToRemove.js';

Template.editUniverse.onCreated(function() {
	this.autorun(() => {
		this.subscribe('anUniverse', Router.current().params._id);
		this.subscribe('allWorkshopsLinkableToUniverse');
	});
});

Template.editUniverse.helpers({
	universe() {
		return Universes.findOne({ _id: Router.current().params._id });
	},
	workshopsNotLinkedToUniverse() {
		let arr = [];
		this.workshopsLinked.map((cur, index, array) => {
			arr.push(cur.workshopId);
		});
		return Workshops.find({
			_id: {
				$nin: arr
			}
		});
	}
});

Template.editUniverse.events({
	'click #save': function(event) {
		event.preventDefault();
		const data = {
			universeId: Router.current().params._id,
			name: $('#universeName').val(),
			label: $('#universeLabel').val(),
			color: $('#universeColor').val(),
			partner: $('#universePartner').val(),
			partnerLogo: $('#universePartnerLogo').val(),
			partnerDescription: $('#universePartnerDescription').val(),
			partnerWebsite: $('#universePartnerWebsite').val(),
			location: $('#universeLocation').val()
		};
		if (!data.name) {
			return Bert.alert('Name must be filled', 'danger', 'growl-top-right');
		}
		if (!data.label) {
			return Bert.alert('Label must be filled', 'danger', 'growl-top-right');
		}
		if (!data.color) {
			return Bert.alert('Color must be filled', 'danger', 'growl-top-right');
		}
		Meteor.call('updateAnUniverse', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	}
});
