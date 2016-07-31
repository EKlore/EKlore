import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Workshops = new Mongo.Collection('workshops');

Workshops.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

let UserIdSchema = new SimpleSchema({
	userId: {
		type: String,
		label: 'Id of the user who go to this workshop'
	},
	enterDate: {
		type: Date,
		label: 'Date when the user entered this workshop'
	}
});

let UniverseSchema = new SimpleSchema({
	universeId: {
		type: String,
		label: 'Univers ID'
	},
	matchingPower: {
		type: Number,
		decimal: true,
		min: 0.01,
		max: 1,
		label: 'Matching power or the universe against the question or choice'
	}
});

Workshops.schema = new SimpleSchema({
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
	},
	color: {
		type: String,
		label: 'Workshop color',
		optional: true
	},
	format: {
		type: String,
		label: 'Workshop\'s format',
		optional: true
	},
	speaker: {
		type: String,
		label: 'Workshop\'s speaker',
		optional: true
	}
});

Workshops.helpers({
	questionsLinked() {
		return UserQuestions.find({ 'workshopsLinked.workshopId': this._id });
	},
	peopleToGoCount() {
		if (this.peopleToGo) {
			return this.peopleToGo.length;
		} else {
			return 0;
		}
	}
});
