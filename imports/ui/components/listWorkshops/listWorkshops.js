import { Template } from 'meteor/templating';

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
			}
		});
	},
	dateStart() {
		return moment(this.dateStart).format('D-MMM H:mm');
	},
	dateEnd() {
		return moment(this.dateEnd).format('D-MMM H:mm');
	}
});
