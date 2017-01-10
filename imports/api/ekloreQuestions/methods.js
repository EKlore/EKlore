import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';

import { EkloreQuestions } from './schema.js';
import { UserQuestions } from '../userQuestions/schema.js';

Meteor.methods({
	'EkloreQuestions.addAnEkloreQuestion': (data) => {
		function yesNoChoices() {
			return [{
				choiceId: Random.id(),
				label: 'yes'
			}, {
				choiceId: Random.id(),
				label: 'no'
			}];
		}

		function qcmDefaultChoices() {
			return [{
				choiceId: Random.id(),
				label: 'Oui'
			}, {
				choiceId: Random.id(),
				label: 'Non'
			}, {
				choiceId: Random.id(),
				label: 'Ne sait pas'
			}];
		}

		function scaleChoices() {
			let arr = [];
			for (let i = 0; i < 10; i++) {
				arr.push({ choiceId: Random.id(), label: i + 1 + '' });
			}
			return arr;
		}

		let methodSchema = new SimpleSchema({
			title: { type: String },
			level: { type: Number },
			displayType: { type: String, allowedValues: ['scale', 'yesNo', 'qcm', 'qcmDefault'] }
		});
		check(data, methodSchema);
		data.version = 1;
		data.deprecated = false;
		data.createdAt = new Date();
		data.choices = [];
		if (data.displayType === 'scale') {
			data.choices = scaleChoices();
		} else if (data.displayType === 'yesNo') {
			data.choices = yesNoChoices();
		} else if (data.displayType === 'qcmDefault') {
			data.choices = qcmDefaultChoices();
			data.displayType = 'qcm';
		}
		data.universesLinked = [];
		data.workshopsLinked = [];
		return EkloreQuestions.insert(data);
	},
	'EkloreQuestions.updateAnEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String },
			title: { type: String },
			level: { type: Number },
			deprecated: { type: Boolean }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				title: data.title,
				level: data.level,
				deprecated: data.deprecated
			},
			$inc: {
				version: 1
			}
		});
	},
	'EkloreQuestions.linkQuestionsGroupToAnEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				questionsGroupId: data.questionsGroupId
			}
		});
	},
	'EkloreQuestions.unlikQuestionGroupFromEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$unset: {
				questionsGroupId: ''
			}
		});
	},
	'EkloreQuestions.addWorkshopToEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			ekloreQuestionId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$push: {
				workshopsLinked: {
					workshopId: data.workshopId,
					matchingPower: data.matchingPower
				}
			}
		});
	},
	'EkloreQuestions.removeWorkshopFromEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				workshopsLinked: {
					workshopId: data.workshopId
				}
			}
		});
	},
	'EkloreQuestions.addUniverseToEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			ekloreQuestionId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$push: {
				universesLinked: {
					universeId: data.universeId,
					matchingPower: data.matchingPower
				}
			}
		});
	},
	'EkloreQuestions.removeUniverseFromEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				universesLinked: {
					universeId: data.universeId
				}
			}
		});
	},
	'EkloreQuestions.addUniverseToChoice': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			choiceId: { type: String },
			ekloreQuestionId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 },
			choiceIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		let pos = 'choices.' + data.choiceIndex + '.universesLinked';
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$push: {
				[pos]: {
					universeId: data.universeId,
					matchingPower: data.matchingPower
				}
			}
		});
	},
	'EkloreQuestions.removeUniverseFromChoice': (data) => {
		let methodSchema = new SimpleSchema({
			universeId: { type: String },
			choiceId: { type: String },
			ekloreQuestionId: { type: String },
			choiceIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		let pos = 'choices.' + data.choiceIndex + '.universesLinked';
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				[pos]: {
					universeId: data.universeId
				}
			}
		});
	},
	'EkloreQuestions.addWorkshopToChoice': (data) => {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			choiceId: { type: String },
			ekloreQuestionId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 },
			choiceIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		let pos = 'choices.' + data.choiceIndex + '.workshopsLinked';
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$push: {
				[pos]: {
					workshopId: data.workshopId,
					matchingPower: data.matchingPower
				}
			}
		});
	},
	'EkloreQuestions.removeWorkshopFromChoice': (data) => {
		let methodSchema = new SimpleSchema({
			workshopId: { type: String },
			choiceId: { type: String },
			ekloreQuestionId: { type: String },
			choiceIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		let pos = 'choices.' + data.choiceIndex + '.workshopsLinked';
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				[pos]: {
					workshopId: data.workshopId
				}
			}
		});
	},
	'EkloreQuestions.updateAChoice': (data) => {
		let methodSchema = new SimpleSchema({
			label: { type: String },
			choiceId: { type: String },
			ekloreQuestionId: { type: String },
			choiceIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		let pos = 'choices.' + data.choiceIndex + '.label';
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				[pos]: data.label
			},
			$inc: {
				version: 1
			}
		});
	},
	'EkloreQuestions.addChoiceToEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$push: {
				choices: {
					choiceId: Random.id()
				}
			}
		});
	},
	'EkloreQuestions.removeChoiceFromEkloreQuestion': (data) => {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String },
			choiceId: { type: String }
		});
		check(data, methodSchema);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				choices: {
					choiceId: data.choiceId
				}
			}
		});
	},
	fillChoices(ekloreQuestionId, mode) {
		check(ekloreQuestionId, String);
		check(mode, String);
		let data = EkloreQuestions.findOne({ _id: ekloreQuestionId }, { fields: { choices: 1 } });
		let newChoices = [];
		let choice1 = data.choices[0];
		let choice10 = data.choices[9];
		if (mode === 'extreme') {
			data.choices.map((cur, index) => {
				if (index === 0 || index === 9) {
					newChoices.push(cur);
				} else {
					cur.universesLinked = [];
					cur.workshopsLinked = [];
					if (index < 5) {
						choice1.universesLinked.map((cur1) => {
							let data = {
								universeId: cur1.universeId,
								matchingPower: lodash.round(cur1.matchingPower - lodash.round(index / 10, 1), 2)
							};
							if (data.matchingPower > 0) {
								cur.universesLinked.push(data);
							}
						});
						choice1.workshopsLinked.map((cur2) => {
							let data = {
								workshopId: cur2.workshopId,
								matchingPower: lodash.round(cur2.matchingPower - lodash.round(index / 10, 1), 2)
							};
							if (data.matchingPower > 0) {
								cur.workshopsLinked.push(data);
							}
						});
					} else {
						choice10.universesLinked.map((cur3) => {
							let data = {
								universeId: cur3.universeId,
								matchingPower: lodash.round(cur3.matchingPower - lodash.round(0.9 - index / 10, 1), 2)
							};
							if (data.matchingPower > 0) {
								cur.universesLinked.push(data);
							}
						});
						choice10.workshopsLinked.map((cur4) => {
							let data = {
								workshopId: cur4.workshopId,
								matchingPower: lodash.round(cur4.matchingPower - lodash.round(0.9 - index / 10, 1), 2)
							};
							if (data.matchingPower > 0) {
								cur.workshopsLinked.push(data);
							}
						});
					}
					newChoices.push(cur);
				}
			});
			return EkloreQuestions.update({ _id: ekloreQuestionId }, {
				$set: {
					choices: newChoices
				}
			});
		} else if (mode === 'linear') {
			return false;
		}
		return true;
	},
	regulQuestionGroupId() {
		let data = EkloreQuestions.find({}, {
			fields: {
				_id: 1,
				questionsGroupId: 1
			}
		}).fetch();
		data.map((cur) => {
			return UserQuestions.update({ questionId: cur._id }, {
				$set: {
					questionGroupId: cur.questionsGroupId
				}
			}, { multi: true });
		});
		return true;
	},
	fixYesNoChoices() {
		let data = EkloreQuestions.find({ displayType: 'yesNo' }, {
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
					return EkloreQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Oui'
						}
					});
				} else if (cur1.label === 'no') {
					let res = 'choices.' + index1 + '.label';
					return EkloreQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Non'
						}
					});
				}
			});
		});
	},
	fixDontKnowChoices() {
		let data = EkloreQuestions.find({ displayType: 'qcm' }, {
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
					return EkloreQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Ne sais pas'
						}
					});
				}
			});
		});
	}
});
