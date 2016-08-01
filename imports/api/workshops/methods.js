import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Workshops } from './schema.js';

Meteor.methods({
	addAWorkshop(data) {
		let methodSchema = new SimpleSchema({
			name: { type: String },
			description: { type: String },
			dateStart: { type: Date },
			dateEnd: { type: Date },
			format: { type: String, optional: true },
			speaker: { type: String, optional: true }
		});
		check(data, methodSchema);
		data.universesLinked = [];
		return Workshops.insert(data);
	},
	updateAWorkshop(data) {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			name: { type: String },
			description: { type: String },
			dateStart: { type: Date },
			dateEnd: { type: Date },
			color: { type: String },
			format: { type: String, optional: true },
			speaker: { type: String, optional: true }
		});
		check(data, methodSchema);
		return Workshops.update({ _id: data.workshopId }, {
			$set: {
				name: data.name,
				description: data.description,
				dateStart: data.dateStart,
				dateEnd: data.dateEnd,
				color: data.color,
				format: data.format,
				speaker: data.speaker
			}
		});
	},
	addUniverseToWorkshop(data) {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			universeId: { type: String },
			matchingPower: {
				type: Number,
				decimal: true,
				min: 0.01,
				max: 1
			}
		});
		check(data, methodSchema);
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
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			universeId: { type: String }
		});
		check(data, methodSchema);
		return Workshops.update({ _id: data.workshopId }, {
			$pull: {
				universesLinked: {
					universeId: data.universeId
				}
			}
		});
	},
	addUserToWorkshop(data) {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			userId: { type: String }
		});
		check(data, methodSchema);
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
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			userId: { type: String }
		});
		check(data, methodSchema);
		return Workshops.update({ _id: data.workshopId }, {
			$pull: {
				peopleToGo: {
					userId: data.userId
				}
			}
		});
	}
});
