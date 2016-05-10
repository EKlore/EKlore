Workshops = new Mongo.Collection('workshops');

var Schemas = {};

UserIdSchema = new SimpleSchema({
	userId: {
		type: String,
		label: 'Id of the user who go to this workshop'
	},
	enterDate: {
		type: Date,
		label: 'Date when the user entered this workshop'
	}
});

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
		label: 'Workshops description'
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
	},
	peopleToGo: {
		type: [UserIdSchema],
		label: 'List of people to go to this workshop',
		optional: true
	}
});

Workshops.attachSchema(Schemas.Workshops);

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
		return Workshops.update({ _id: data.workshopId }, {
			$set: {
				name: data.name,
				description: data.description,
				dateStart: data.dateStart,
				dateEnd: data.dateEnd
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

Workshops.helpers({
	questionsLinked() {
		return UserQuestions.find({ 'workshopsLinked.workshopId': this._id });
	},
	universesLinkedCount() {
		return this.universesLinked.length;
	},
	peopleToGoCount() {
		if (this.peopleToGo) {
			return this.peopleToGo.length;
		} else {
			return 0;
		}
	}
});
