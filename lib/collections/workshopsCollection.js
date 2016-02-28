Workshops = new Mongo.Collection('workshops');

var Schemas = {};

UniverseSchema = new SimpleSchema({
	universeId: {
		type: String,
		label: 'Univers ID'
	},
	matchingPower: {
		type: Number,
		decimal: true,
		label: 'Matching power or the universe against the question or choice'
	}
});

Schemas.Workshops = new SimpleSchema({
	name: {
		type: String,
		label: 'Workshops name'
	},
	description: {
		type: String,
		label: 'Workshops description',
	},
	dateStart: {
		type: Date,
		label: 'Start date and hour of the workshop'
	},
	dateEnd: {
		type: Date,
		label: 'End date and hour of the workshop'
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universes to the choice'
	}
});

Workshops.attachSchema(Schemas.Workshops);

Meteor.methods({
	addAWorkshop: function(workshopData) {
		check(workshopData.name, String);
		check(workshopData.description, String);
		check(workshopData.dateStart, Date);
		check(workshopData.dateEnd, Date);
		if (!workshopData.universesLinked) {
			workshopData.universesLinked = [];
		}
		return Workshops.insert(workshopData);
	},
	updateAWorkshop: function(workshopData) {
		check(workshopData.workshopId, String);
		check(workshopData.name, String);
		check(workshopData.description, String);
		check(workshopData.dateStart, Date);
		check(workshopData.dateEnd, Date);
		return Workshops.update({ _id: workshopData.workshopId }, {
			$set: {
				name: workshopData.name,
				description: workshopData.description,
				dateStart: workshopData.dateStart,
				dateEnd: workshopData.dateEnd
			}
		});
	},
	addUniverseToWorkshop: function(universeData) {
		check(universeData.workshopId, String);
		check(universeData.universeId, String);
		check(universeData.matchingPower, Number);
		return Workshops.update({ _id: universeData.workshopId }, {
			$push: {
				universesLinked: {
					universeId: universeData.universeId,
					matchingPower: universeData.matchingPower
				}
			}
		});
	},
	removeUniverseFromWorkshop: function(universeData) {
		check(universeData.workshopId, String);
		check(universeData.universeId, String);
		return Workshops.update({ _id: universeData.workshopId }, {
			$pull: {
				universesLinked: {
					universeId: universeData.universeId,
				}
			}
		});
	}
});

Workshops.helpers({
	questionsLinked: function() {
		return UserQuestions.find({ 'workshopsLinked.workshopId': this._id });
	},
	universesLinkedCount: function() {
		return this.universesLinked.length;
	}
});
