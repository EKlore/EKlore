import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

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
	workshops() {
		return Workshops.find({
			'universesLinked.universeId': {
				$ne: this._id
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
			color: $('#universeColor').val()
		};
		Meteor.call('updateAUniverse', data, (error, result) => {
			if (error) {
				return error.message;
			}
		});
	}
});
