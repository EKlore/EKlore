import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Universes } from './schema.js';

Meteor.methods({
	addAUniverse(data) {
		let methodSchema = new SimpleSchema({
			name: { type: String },
			label: { type: String }
		});
		check(data, methodSchema);
		data.color = '#3355CC';
		data.workshopsLinked = [];
		return Universes.insert(data);
	},
	updateAUniverse(data) {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			name: { type: String },
			label: { type: String },
			color: { type: String }
		});
		check(data, methodSchema);
		return Universes.update({ _id: data.universeId }, {
			$set: {
				name: data.name,
				label: data.label,
				color: data.color
			}
		});
	},
	addWorkshopToUniverse(data) {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			workshopId: { type: String },
			matchingPower: {
				type: Number,
				decimal: true,
				min: 0.01,
				max: 1
			}
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
	removeWorkshopFromUniverse(data) {
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
