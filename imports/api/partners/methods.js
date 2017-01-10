import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Partners } from './schema.js';

Meteor.methods({
	'Partners.addAPartner': (data) => {
		let methodSchema = new SimpleSchema({
			firstName: { type: String, optional: true },
			lastName: { type: String, optional: true },
			companyName: { type: String, optional: true },
			description: { type: String, optional: true }
		});
		check(data, methodSchema);
		if (!data.pictureUrl) {
			data.pictureUrl = '/no_picture.gif';
		}
		if (!data.universesLinked) {
			data.universesLinked = [];
		}
		if (!data.workshopsLinked) {
			data.workshopsLinked = [];
		}
		return Partners.insert(data);
	},
	'Partners.updateAPartner': (data) => {
		let methodSchema = new SimpleSchema({
			partnerId: { type: String },
			firstName: { type: String, optional: true },
			lastName: { type: String, optional: true },
			companyName: { type: String, optional: true },
			description: { type: String, optional: true },
			website: { type: String, optional: true },
			pictureUrl: { type: String, optional: true }
		});
		check(data, methodSchema);
		return Partners.update({ _id: data.partnerId }, {
			$set: {
				firstName: data.firstName,
				lastName: data.lastName,
				companyName: data.companyName,
				description: data.description,
				website: data.website,
				pictureUrl: data.pictureUrl
			}
		});
	},
	'Partners.addUniverseToPartner': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			partnerId: { type: String }
		});
		check(data, methodSchema);
		return Partners.update({ _id: data.partnerId }, {
			$addToSet: {
				universesLinked: {
					universeId: data.universeId
				}
			}
		});
	},
	'Partners.removeUniverseFromPartner': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			partnerId: { type: String }
		});
		check(data, methodSchema);
		return Partners.update({ _id: data.partnerId }, {
			$pull: {
				universesLinked: {
					universeId: data.universeId
				}
			}
		});
	},
	'Partners.addWorkshopToPartner': (data) => {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			partnerId: { type: String }
		});
		check(data, methodSchema);
		return Partners.update({ _id: data.partnerId }, {
			$addToSet: {
				workshopsLinked: {
					workshopId: data.workshopId
				}
			}
		});
	},
	'Partners.removeWorkshopFromPartner': (data) => {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			partnerId: { type: String }
		});
		check(data, methodSchema);
		return Partners.update({ _id: data.partnerId }, {
			$pull: {
				workshopsLinked: {
					workshopId: data.workshopId
				}
			}
		});
	}
});
