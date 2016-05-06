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
	removeQuestion(data) {
		check(data, String);
		return UserQuestions.remove({ _id: data });
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
	},
	saveQuestionResult(data) {
		check(data, Object);
		check(data._id, String);
		check(data.result, Array);
		check(data.result[0], Object);
		check(data.result[0].result, Number);
		if (data.result[0].universeId) {
			check(data.result[0].universeId, String);
		} else if (data.result[0].workshopId) {
			check(data.result[0].workshopId, String);
		}
		return UserQuestions.update({ _id: data._id }, {
			$set: {
				result: data.result
			}
		});
	}
});

MethodHooks.after('answerQuestion', (options) => {
	if (options.error) {
		return;
	} else if (options.result === 1) {
		const data = UserQuestions.findOne({ _id: options.arguments[0].userQuestionId }, {
			fields: {
				choices: 1,
				universesLinked: 1,
				workshopsLinked: 1,
				choiceSelected: 1
			}
		});
		const ind = lodash.findIndex(data.choices, ['choiceId', data.choiceSelected]);
		const choice = data.choices[ind];
		let result = [];
		for (let i = 0; i < choice.universesLinked.length; i++) {
			for (let j = 0; j < data.universesLinked.length; j++) {
				if (choice.universesLinked[i].universeId === data.universesLinked[j].universeId) {
					result.push({
						universeId: choice.universesLinked[i].universeId,
						result: lodash.round((choice.universesLinked[i].matchingPower + data.universesLinked[j].matchingPower) / 2, 4)
					});
					break;
				}
			}
		}
		for (let i = 0; i < choice.workshopsLinked.length; i++) {
			for (let j = 0; j < data.workshopsLinked.length; j++) {
				if (choice.workshopsLinked[i].workshopId === data.workshopsLinked[j].workshopId) {
					result.push({
						workshopId: choice.workshopsLinked[i].workshopId,
						result: lodash.round((choice.workshopsLinked[i].matchingPower * data.workshopsLinked[j].matchingPower) / 2, 4)
					});
					break;
				}
			}
		}
		Meteor.call('saveQuestionResult', { result, _id: data._id });

		return options.result;
	}
});
