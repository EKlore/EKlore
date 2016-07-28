import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { EkloreQuestions } from './schema.js';

Meteor.methods({
	addAnEkloreQuestion(data) {
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
		return EkloreQuestions.insert(data);
	},
	updateAnEkloreQuestion(data) {
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
	linkQuestionsGroupToAnEkloreQuestion(data) {
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
	unlikQuestionGroupFromEkloreQuestion(data) {
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
	addWorkshopToEkloreQuestion(data) {
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
	removeWorkshopFromEkloreQuestion(data) {
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
	addUniverseToEkloreQuestion(data) {
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
	removeUniverseFromEkloreQuestion(data) {
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
	addUniverseToChoice(data) {
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
	removeUniverseFromChoice(data) {
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
	addWorkshopToChoice(data) {
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
	removeWorkshopFromChoice(data) {
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
	updateAChoice(data) {
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
	addChoiceToEkloreQuestion(data) {
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
	removeChoiceFromEkloreQuestion(data) {
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
	}
});
