import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import 'meteor/sacha:spin';

import { Workshops } from '../../../api/workshops/schema.js';

import './listWorkshops.jade';

Template.listWorkshops.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allWorkshops');
	});
});

Template.listWorkshops.helpers({
	workshopsCount() {
		return Workshops.find({}).count();
	},
	workshop() {
		return Workshops.find({}, {
			sort: {
				dateStart: 1
			},
			fields: {
				name: 1,
				dateStart: 1,
				dateEnd: 1,
				universesLinked: 1,
				peopleToGo: 1
			}
		});
	},
	dateStart() {
		return moment(this.dateStart).format('H:mm');
	},
	dateEnd() {
		return moment(this.dateEnd).format('H:mm');
	},
	myIndex(index) {
		return index + 1;
	}
});
