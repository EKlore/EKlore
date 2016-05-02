UserQuestions = new Mongo.Collection('userQuestions');

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

ResultSchema = new SimpleSchema({
	universeId: {
		type: String,
		label: 'Univers ID',
		optional: true
	},
	workshopId: {
		type: String,
		label: 'Workshop ID',
		optional: true
	},
	result: {
		type: Number,
		decimal: true,
		label: 'Result for an univer of a workshop'
	}
});

Schemas.UserQuestions = new SimpleSchema({
	questionId: {
		type: String,
		label: 'Question ID'
	},
	userId: {
		type: String,
		label: 'User Id'
	},
	answered: {
		type: Boolean,
		label: 'Does the user has answered the question ?'
	},
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
		label: 'Choices list'
	},
	choiceSelected: {
		type: String,
		label: 'User choice',
		optional: true
	},
	deprecated: {
		type: Boolean,
		label: 'Is the question deprecated or not'
	},
	universesLinked: {
		type: [UniverseSchema],
		label: 'List of the linked universe to the question'
	},
	workshopsLinked: {
		type: [WorkshopSchema],
		label: 'List of the linked workshops to the question'
	},
	answerDate: {
		type: Date,
		label: 'Answer date',
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
	result: {
		type: [ResultSchema],
		label: 'Question result  via Choice x Question univers & workshop matching power',
		optional: true
	}
});

UserQuestions.attachSchema(Schemas.UserQuestions);

Meteor.methods({
	insertQuestion(data) {
		check(data, Object);
		check(data.title, String);
		check(data.level, Number);
		check(data.displayType, String);
		check(data.version, Number);
		check(data.deprecated, Boolean);
		check(data.choices, Array);
		check(data.universesLinked, Array);
		check(data.workshopsLinked, Array);
		check(data.answered, Boolean);
		check(data.userId, String);
		check(data.questionId, String);
		return UserQuestions.insert(data);
	},
	answerQuestion(data) {
		check(data, Object);
		check(data.userQuestionId, String);
		check(data.choiceSelected, String);
		return UserQuestions.update({ _id: data.userQuestionId }, {
			$set: {
				choiceSelected: data.choiceSelected,
				answered: true,
				answerDate: new Date()
			}
		});
	}
});
