import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Universes } from './schema.js';

Meteor.methods({
	addAUniverse(data) {
		check(data.name, String);
		check(data.label, String);
		if (!data.workshopsLinked) {
			data.workshopsLinked = [];
		}
		return Universes.insert(data);
	},
	updateAUniverse(data) {
		check(data.universeId, String);
		check(data.name, String);
		check(data.label, String);
		check(data.color, String);
		return Universes.update({ _id: data.universeId }, {
			$set: {
				name: data.name,
				label: data.label,
				color: data.color
			}
		});
	},
	addWorkshopToUniverse(workshopData) {
		check(workshopData.universeId, String);
		check(workshopData.workshopId, String);
		check(workshopData.matchingPower, Number);
		return Universes.update({ _id: workshopData.universeId }, {
			$push: {
				workshopsLinked: {
					workshopId: workshopData.workshopId,
					matchingPower: workshopData.matchingPower
				}
			}
		});
	},
	removeWorkshopFromUniverse(workshopData) {
		check(workshopData.universeId, String);
		check(workshopData.workshopId, String);
		return Universes.update({ _id: workshopData.universeId }, {
			$pull: {
				workshopsLinked: {
					workshopId: workshopData.workshopId
				}
			}
		});
	}
});
