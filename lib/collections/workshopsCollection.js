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
	addAWorkshop: function(WorkshopData) {
		return Workshops.insert(WorkshopData);
	}
});

Universes.helpers({
	questionsLinked() {
		return UserQuestions.find({ 'workshopsLinked.workshopId': this._id });
	},
	universesLinkedCount() {
		return this.universesLinked.length;
	}
});
