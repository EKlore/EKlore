import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Workshops } from '../../../api/workshops/schema.js';
import { Partners } from '../../../api/partners/schema.js';

import './workshopDetails.jade';
import '../../components/goToWorkshop/goToWorkshop.js';

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
	partners() {
		return Partners.find({
			workshopsLinked: {
				workshopId: Router.current().params._id
			}
		}, {
			sort: {
				lastName: 1
			}
		});
	}
});
