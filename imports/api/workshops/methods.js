import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Workshops } from './schema.js';

Meteor.methods({
	addAWorkshop(data) {
		check(data.name, String);
		check(data.description, String);
		check(data.dateStart, Date);
		check(data.dateEnd, Date);
		if (!data.universesLinked) {
			data.universesLinked = [];
		}
		return Workshops.insert(data);
	},
	updateAWorkshop(data) {
		check(data.workshopId, String);
		check(data.name, String);
		check(data.description, String);
		check(data.dateStart, Date);
		check(data.dateEnd, Date);
		check(data.color, String);
		return Workshops.update({ _id: data.workshopId }, {
			$set: {
				name: data.name,
				description: data.description,
				dateStart: data.dateStart,
				dateEnd: data.dateEnd,
				color: data.color
			}
		});
	},
	addUniverseToWorkshop(data) {
		check(data.workshopId, String);
		check(data.universeId, String);
		check(data.matchingPower, Number);
		return Workshops.update({ _id: data.workshopId }, {
			$push: {
				universesLinked: {
					universeId: data.universeId,
					matchingPower: data.matchingPower
				}
			}
		});
	},
	removeUniverseFromWorkshop(data) {
		check(data.workshopId, String);
		check(data.universeId, String);
		return Workshops.update({ _id: data.workshopId }, {
			$pull: {
				universesLinked: {
					universeId: data.universeId
				}
			}
		});
	},
	addUserToWorkshop(data) {
		check(data.workshopId, String);
		check(data.userId, String);
		return Workshops.update({ _id: data.workshopId }, {
			$push: {
				peopleToGo: {
					userId: data.userId,
					enterDate: new Date()
				}
			}
		});
	},
	removeUserFromWorkshop(data) {
		check(data.workshopId, String);
		check(data.userId, String);
		return Workshops.update({ _id: data.workshopId }, {
			$pull: {
				peopleToGo: {
					userId: data.userId
				}
			}
		});
	}
});