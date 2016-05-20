Universes = new Mongo.Collection('universes');

var Schemas = {};

WorkshopSchema = new SimpleSchema({
	workshopId: {
		type: String,
		label: 'Workshop ID'
	},
	matchingPower: {
		type: Number,
		decimal: true,
		label: 'Matching power or the workshop against the question or choice'
	}
});

Schemas.Universes = new SimpleSchema({
	name: {
		type: String,
		label: 'Universes name'
	},
	label: {
		type: String,
		label: 'Universes label'
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the choice',
		optional: true
	},
	color: {
		type: String,
		label: 'Universe color',
		optional: true
	}
});

Universes.attachSchema(Schemas.Universes);

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

Universes.helpers({
	questionsLinked() {
		return UserQuestions.find({ 'universesLinked.universeId': this._id });
	},
	workshopsLinkedCount() {
		return this.workshopsLinked.length;
	}
});
