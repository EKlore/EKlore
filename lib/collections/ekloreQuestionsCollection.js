EkloreQuestions = new Mongo.Collection('ekloreQuestions');

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

ChoiceSchema = new SimpleSchema({
	choiceId: {
		type: String,
		label: 'Choice ID'
	},
	label: {
		type: String,
		label: 'tradID via i18n'
	},
	pictureSource: {
		type: String,
		label: 'Url or image path',
		optional: true
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universes to the choice'
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the choice'
	}
});

Schemas.EkloreQuestions = new SimpleSchema({
	level: {
		type: Number,
		label: 'Question level'
	},
	version: {
		type: Number,
		label: 'Question version'
	},
	choices: {
		type: [ChoiceSchema],
		label: 'Choices list',
		optional: true
	},
	deprecated: {
		type: Boolean,
		label: 'Is the question deprecated or not'
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universe to the question',
		optional: true
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the question',
		optional: true
	},
	questionGroupId: {
		type: String,
		label: 'Question group ID',
		optional: true
	},
	displayType: {
		type: String,
		label: 'Question display',
		allowedValues: ['text', 'picture']
	},
	title: {
		type: String,
		label: 'Question title'
	},
	createdAt: {
		type: Date,
		label: 'Question creation date'
	}
});

EkloreQuestions.attachSchema(Schemas.EkloreQuestions);

Meteor.methods({
	addAnEkloreQuestion(ekloreQuestion) {
		check(ekloreQuestion.title, String);
		check(ekloreQuestion.level, Number);
		check(ekloreQuestion.displayType, String);
		ekloreQuestion.version = 1;
		ekloreQuestion.deprecated = false;
		ekloreQuestion.createdAt = new Date();
		return EkloreQuestions.insert(ekloreQuestion);
	},
	linkQuestionGroupToAnEkloreQuestion(data) {
		check(data, Object);
		check(data.questionGroupId, String);
		check(data.ekloreQuestionId, String);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				questionGroupId: data.questionGroupId
			}
		});
	},
	unlikQuestionGroupFromEkloreQuestion(data) {
		check(data, Object);
		check(data.ekloreQuestionId, String);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$unset: {
				questionGroupId: ''
			}
		});
	},
	addWorkshopToEkloreQuestion(data) {
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.workshopId, String);
		check(data.matchingPower, Number);
	}
});
