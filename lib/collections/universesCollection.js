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
