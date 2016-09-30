import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import { moment } from 'meteor/momentjs:moment';
import 'meteor/sacha:spin';

import { Universes } from '../../../api/universes/schema.js';
import { Workshops } from '../../../api/workshops/schema.js';

import './editWorkshop.jade';
import '../../components/universesToAdd/universesToAdd.js';
import '../../components/universesToRemove/universesToRemove.js';

Template.editWorkshop.onCreated(function() {
	this.autorun(() => {
		this.subscribe('aWorkshop', Router.current().params._id);
		this.subscribe('allUniversesLinkableToWorkshop');
	});
});

Template.editWorkshop.onRendered(() => {
	this.$('#workshopDateStartEdit').datetimepicker({
		locale: 'fr',
		format: 'YYYY-MM-D HH:mm'
	});
	this.$('#workshopEndDateEdit').datetimepicker({
		locale: 'fr',
		format: 'YYYY-MM-D HH:mm'
	});
});

Template.editWorkshop.helpers({
	workshop() {
		return Workshops.findOne({ _id: Router.current().params._id });
	},
	dateStart() {
		return moment(this.dateStart).format('YYYY-MM-D HH:mm');
	},
	dateEnd() {
		return moment(this.dateEnd).format('YYYY-MM-D HH:mm');
	},
	universes() {
		let arr = [];
		this.universesLinked.map((cur) => {
			arr.push(cur.universeId);
		});
		return Universes.find({
			_id: {
				$nin: arr
			}
		});
	}
});

Template.editWorkshop.events({
	'click #save': function(event) {
		event.preventDefault();
		const data = {
			workshopId: Router.current().params._id,
			name: $('#workshopName').val(),
			description: $('#workshopDescription').val(),
			dateStart: moment($('#workshopDateStartEdit').val(), 'YYYY-MM-D HH:mm').toDate(),
			dateEnd: moment($('#workshopEndDateEdit').val(), 'YYYY-MM-D HH:mm').toDate(),
			color: $('#workshopColor').val(),
			format: $('#workshopFormat').val(),
			speaker: $('#workshopSpeaker').val()
		};
		if (!data.name) {
			return Bert.alert('Name must be filled', 'danger', 'growl-top-right');
		}
		if (!data.description) {
			return Bert.alert('Description must be filled', 'danger', 'growl-top-right');
		}
		if (!data.dateStart) {
			return Bert.alert('Date start must be filled', 'danger', 'growl-top-right');
		}
		if (!data.dateEnd) {
			return Bert.alert('Date end must be filled', 'danger', 'growl-top-right');
		}
		if (data.dateEnd < data.dateStart) {
			return Bert.alert('Date start must be inferior to Date end', 'danger', 'growl-top-right');
		}
		if (!data.color) {
			return Bert.alert('Color must be filled', 'danger', 'growl-top-right');
		}
		Meteor.call('updateAWorkshop', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	}
});
