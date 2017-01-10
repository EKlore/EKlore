import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Universes } from './schema.js';

Meteor.methods({
	'Universes.addAUniverse': (data) => {
		let methodSchema = new SimpleSchema({
			name: { type: String },
			label: { type: String },
			partner: { type: String, optional: true },
			partnerLogo: { type: String, optional: true },
			universeLogo: { type: String, optional: true },
			partnerDescription: { type: String, optional: true },
			partnerWebsite: { type: String, optional: true },
			location: { type: String, optional: true }
		});
		check(data, methodSchema);
		data.color = '#3355CC';
		data.workshopsLinked = [];
		return Universes.insert(data);
	},
	'Universes.updateAnUniverse': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			name: { type: String },
			label: { type: String },
			color: { type: String },
			partner: { type: String, optional: true },
			partnerLogo: { type: String, optional: true },
			universeLogo: { type: String, optional: true },
			partnerDescription: { type: String, optional: true },
			partnerWebsite: { type: String, optional: true },
			location: { type: String, optional: true }
		});
		check(data, methodSchema);
		return Universes.update({ _id: data.universeId }, {
			$set: {
				name: data.name,
				label: data.label,
				color: data.color,
				partner: data.partner,
				partnerLogo: data.partnerLogo,
				universeLogo: data.universeLogo,
				partnerDescription: data.partnerDescription,
				partnerWebsite: data.partnerWebsite,
				location: data.location
			}
		});
	},
	'Universes.addWorkshopToUniverse': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			workshopId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
		});
		check(data, methodSchema);
		return Universes.update({ _id: data.universeId }, {
			$push: {
				workshopsLinked: {
					workshopId: data.workshopId,
					matchingPower: data.matchingPower
				}
			}
		});
	},
	'Universes.removeWorkshopFromUniverse': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			workshopId: { type: String }
		});
		check(data, methodSchema);
		return Universes.update({ _id: data.universeId }, {
			$pull: {
				workshopsLinked: {
					workshopId: data.workshopId
				}
			}
		});
	}
});
