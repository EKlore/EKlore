import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';

import { UserQuestions } from './schema.js';

Meteor.methods({
	insertQuestion(data) {
		let UniverseSchema = new SimpleSchema({
			universeId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
		});
		let WorkshopSchema = new SimpleSchema({
			workshopId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
		});
		let ChoicesSchema = new SimpleSchema({
			choiceId: { type: String },
			label: { type: String },
			universesLinked: { type: [UniverseSchema], minCount: 1 },
			workshopsLinked: { type: [WorkshopSchema], minCount: 1 }
		});
		let methodSchema = new SimpleSchema({
			title: { type: String },
			level: { type: Number, min: 1 },
			displayType: { type: String, allowedValues: ['yesNo', 'qcm', 'scale'] },
			version: { type: Number, min: 1 },
			deprecated: { type: Boolean },
			choices: { type: [ChoicesSchema], minCount: 2 },
			universesLinked: { type: [UniverseSchema], minCount: 1 },
			workshopsLinked: { type: [WorkshopSchema], minCount: 1 },
			answered: { type: Boolean },
			userId: { type: String },
			questionId: { type: String },
			questionGroupId: { type: String }
		});
		check(data, methodSchema);
		return UserQuestions.insert(data);
	},
	answerQuestion(data) {
		let methodSchema = new SimpleSchema({
			userQuestionId: { type: String },
			choiceSelected: { type: String }
		});
		check(data, methodSchema);
		return UserQuestions.update({ _id: data.userQuestionId }, {
			$set: {
				choiceSelected: data.choiceSelected,
				answered: true,
				answerDate: new Date()
			}
		});
	},
	saveQuestionResult(data) {
		let ResultSchema = new SimpleSchema({
			universeId: { type: String, optional: true },
			workshopId: { type: String, optional: true },
			result: { type: Number, decimal: true }
		});
		let methodSchema = new SimpleSchema({
			_id: { type: String },
			result: { type: [ResultSchema] }
		});
		check(data, methodSchema);
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
	},
	deleteDoublons() {
		let users = Meteor.users.find({}, {
			fields: {
				_id: 1
			}
		}).fetch();
		users.map((cur) => {
			let questionsForUser = UserQuestions.find({ userId: cur._id }, {
				fields: {
					_id: 1,
					answered: 1,
					questionId: 1
				},
				sort: {
					questionId: 1
				}
			}).fetch();
			let lastQuestion = { _id: null, questionId: null, answered: null };
			questionsForUser.map((cur1) => {
				if (lastQuestion._id === null) {
					lastQuestion._id = cur1._id;
					lastQuestion.questionId = cur1.questionId;
					lastQuestion.answered = cur1.answered;
				} else {
					if (lastQuestion.questionId === cur1.questionId && lastQuestion.answered === cur1.answered) {
						UserQuestions.remove({ _id: cur1._id });
					} else if (lastQuestion.questionId === cur1.questionId && lastQuestion.answered !== cur1.answered) {
						if (lastQuestion.answered === false) {
							UserQuestions.remove({ _id: lastQuestion._id });
							lastQuestion._id = cur1._id;
							lastQuestion.questionId = cur1.questionId;
							lastQuestion.answered = cur1.answered;
						} else {
							UserQuestions.remove({ _id: cur1._id });
						}
					} else if (lastQuestion.questionId !== cur1.questionId) {
						lastQuestion._id = cur1._id;
						lastQuestion.questionId = cur1.questionId;
						lastQuestion.answered = cur1.answered;
					}
				}
			});
		});
	},
	fixResults() {
		UserQuestions.update({}, {
			$set: {
				result: []
			}
		}, { multi: true });
		let data = UserQuestions.find({
			answered: true,
			deprecated: false
		}, {
			fields: {
				choices: 1,
				universesLinked: 1,
				workshopsLinked: 1,
				choiceSelected: 1
			}
		}).fetch();
		data.map((cur) => {
			const ind = lodash.findIndex(cur.choices, ['choiceId', cur.choiceSelected]);
			const choice = cur.choices[ind];
			let result = [];
			for (let i = 0; i < choice.universesLinked.length; i++) {
				for (let j = 0; j < cur.universesLinked.length; j++) {
					if (choice.universesLinked[i].universeId === cur.universesLinked[j].universeId) {
						result.push({
							universeId: choice.universesLinked[i].universeId,
							result: lodash.round((choice.universesLinked[i].matchingPower + cur.universesLinked[j].matchingPower) / 2, 4)
						});
						break;
					}
				}
			}
			for (let i = 0; i < choice.workshopsLinked.length; i++) {
				for (let j = 0; j < cur.workshopsLinked.length; j++) {
					if (choice.workshopsLinked[i].workshopId === cur.workshopsLinked[j].workshopId) {
						result.push({
							workshopId: choice.workshopsLinked[i].workshopId,
							result: lodash.round((choice.workshopsLinked[i].matchingPower + cur.workshopsLinked[j].matchingPower) / 2, 4)
						});
						break;
					}
				}
			}
			Meteor.call('saveQuestionResult', { result, _id: cur._id });
		});
	},
	fixYesNoChoicesForUser() {
		let data = UserQuestions.find({ displayType: 'yesNo' }, {
			fields: {
				_id: 1,
				'choices.choiceId': 1,
				'choices.label': 1,
				displayType: 1
			}
		}).fetch();
		data.map((cur) => {
			cur.choices.map((cur1, index1) => {
				if (cur1.label === 'yes') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Oui'
						}
					});
				} else if (cur1.label === 'no') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Non'
						}
					});
				}
			});
		});
	},
	fixDontKnowChoicesForUser() {
		let data = UserQuestions.find({ displayType: 'qcm' }, {
			fields: {
				_id: 1,
				'choices.choiceId': 1,
				'choices.label': 1,
				displayType: 1
			}
		}).fetch();
		data.map((cur) => {
			cur.choices.map((cur1, index1) => {
				if (cur1.label === 'Ne sait pas') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Ne sais pas'
						}
					});
				}
			});
		});
	},
	insertScoreForUsers() {
		const users = Meteor.users.find({
			'profile.nbAnswered': 82
		}, {
			fields: {
				_id: 1
			}
		}).fetch();
		users.map((cur) => {
			let result = {
				score: 0,
				case1: '',
				case2: '',
				case3: '',
				case4: ''
			};

			function pointForScaleQuestion(choiceSelected) {
				if (choiceSelected < 4) {
					return 1;
				} else if (choiceSelected < 7) {
					return 2;
				} else {
					return 3;
				}
			}

			function pointForQCMOrYesNoQuestion(choiceSelected) {
				if (choiceSelected === 'Oui') {
					return 3;
				} else if (choiceSelected === 'Non') {
					return 2;
				} else {
					return 1;
				}
			}

			function patternForQCMOrYesNoQuestion(choiceSelected) {
				if (choiceSelected === 'Oui') {
					return 'A';
				} else if (choiceSelected === 'Non') {
					return 'B';
				} else {
					return 'NSP';
				}
			}

			function scoreForQCMOrYesNoQuestion(result) {
				let result1 = false;
				let result2 = false;
				let result3 = false;
				let result4 = false;
				if (result.case1 === 'ABAB' || result.case1 === 'BABA') {
					result1 = true;
				}
				if (result.case2 === 'ABBA' || result.case2 === 'BAAB') {
					result2 = true;
				}
				if (result.case3 === 'ABAB' || result.case3 === 'BABA') {
					result3 = true;
				}
				if (result.case4 === 'ABBA' || result.case4 === 'BAAB') {
					result4 = true;
				}
				if (result1 && result2 && result3 && result4) {
					return result.score += 3;
				} else {
					return result.score += 1;
				}
			}

			let data = UserQuestions.find({
				userId: cur._id,
				answered: true
			}, {
				sort: {
					level: 1
				},
				fields: {
					userId: 1,
					level: 1,
					choiceSelected: 1,
					'choices.choiceId': 1,
					'choices.label': 1
				}
			}).fetch();
			data.map((cur) => {
				let ind = lodash.findIndex(cur.choices, ['choiceId', cur.choiceSelected]);
				let labelForChoiceSelected = cur.choices[ind].label;
				if (cur.level === 2 || cur.level === 3) {
					return result.score += pointForScaleQuestion(Number(labelForChoiceSelected));
				} else if (cur.level <= 7) {
					return result.case1 = result.case1.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
				} else if (cur.level <= 11) {
					return result.case2 = result.case2.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
				} else if (cur.level <= 15) {
					return result.case3 = result.case3.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
				} else if (cur.level <= 19) {
					return result.case4 = result.case4.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
				} else if (cur.level >= 22 && cur.level <= 66) {
					return result.score += pointForQCMOrYesNoQuestion(labelForChoiceSelected);
				} else if (cur.level === 67) {
					if (labelForChoiceSelected === 'Moins d’un an') {
						return result.score += 3;
					} else if (labelForChoiceSelected === 'Moins de deux ans') {
						return result.score += 2;
					} else {
						return result.score += 1;
					}
				} else if (cur.level >= 68 && cur.level <= 80) {
					return result.score += pointForQCMOrYesNoQuestion(labelForChoiceSelected);
				} else if (cur.level === 81) {
					return result.score += pointForScaleQuestion(labelForChoiceSelected);
				} else if (cur.level > 81) {
					return result.score += pointForQCMOrYesNoQuestion(labelForChoiceSelected)
				}
			});
			scoreForQCMOrYesNoQuestion(result);
			return Meteor.users.update({
				_id: cur._id
			}, {
				$set: {
					'profile.score': result.score
				}
			});
		});
	}
});
