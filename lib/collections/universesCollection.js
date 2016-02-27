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
		label: 'Universes label',
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the choice',
		optional: true
	}
});

Universes.attachSchema(Schemas.Universes);

Meteor.methods({
	addAUniverse: function(universeData) {
		check(universeData.name, String);
		check(universeData.label, String);
		if (!universeData.workshopsLinked) {
			universeData.workshopsLinked = [];
		}
		return Universes.insert(universeData);
	},
	addWorkshopToUniverse: function(workshopData) {
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
	removeWorkshopFromUniverse: function(workshopData) {
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
	questionsLinked: function() {
		return UserQuestions.find({ 'universesLinked.universeId': this._id });
	},
	workshopsLinkedCount: function() {
		return this.workshopsLinked.length;
	}
});
