import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Universes } from '../../../api/universes/schema.js';
import { Workshops } from '../../../api/workshops/schema.js';
import { Partners } from '../../../api/partners/schema.js';

import './seeUniverses.jade';

Template.seeUniverses.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUniverses');
		this.subscribe('allWorkshopsToSee');
		this.subscribe('allPartnersForUniverses');
	});
});

Template.seeUniverses.helpers({
	universes() {
		return Universes.find({}, {
			sort: {
				name: 1
			},
			fields: {
				name: 1,
				label: 1,
				partner: 1,
				partnerLogo: 1,
				universeLogo: 1,
				partnerDescription: 1,
				partnerWebsite: 1,
				location: 1,
				workshopsLinked: 1
			}
		});
	},
	workshops() {
		let query = [];
		this.workshopsLinked.map((cur, index, array) => {
			if (cur.matchingPower === 1) {
				query.push(cur.workshopId);
			}
		});
		return Workshops.find({
			_id: {
				$in: query
			}
		}, {
			sort: {
				name: 1
			},
			fields: {
				name: 1,
				description: 1,
				speaker: 1,
				format: 1
			}
		});
	},
	partners() {
		return Partners.find({
			universesLinked: {
				universeId: this._id
			}
		});
	},
	partnerDescription() {
		return Template.parentData().partnerDescription;
	},
	partnerWebsite() {
		return Template.parentData().partnerWebsite;
	}
});
