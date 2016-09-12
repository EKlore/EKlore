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
		users.map((cur, index, array) => {
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
			questionsForUser.map((cur1, index, array) => {
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
		data.map((cur, index, array) => {
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
		let data = UserQuestions.find({displayType: 'yesNo'}, {
			fields: {
				_id:1,
				'choices.choiceId':1,
				'choices.label':1,
				displayType:1
			}
		}).fetch();
		data.map((cur, index, array) => {
			cur.choices.map((cur1, index1, array) => {
				if (cur1.label === 'yes') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({_id: cur._id}, {
						$set: {
							[res]: 'Oui'
						}
					});
				} else if (cur1.label === 'no') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({_id: cur._id}, {
						$set: {
							[res]: 'Non'
						}
					});
				}
			});
		});
	}
});
