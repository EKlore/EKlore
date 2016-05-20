import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { EkloreQuestions } from './schema.js';

Meteor.methods({
	addAnEkloreQuestion(data) {
		check(data, Object);
		check(data.title, String);
		check(data.level, Number);
		check(data.displayType, String);
		data.version = 1;
		data.deprecated = false;
		data.createdAt = new Date();
		data.choices = [];
		for (let i = 0; i < 4; i++) {
			let choice = {
				choiceId: Random.id()
			};
			data.choices.push(choice);
		}
		return EkloreQuestions.insert(data);
	},
	updateAnEkloreQuestion(data) {
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.title, String);
		check(data.level, Number);
		check(data.displayType, String);
		check(data.deprecated, Boolean);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				title: data.title,
				level: data.level,
				deprecated: data.deprecated,
				displayType: data.displayType
			},
			$inc: {
				version: 1
			}
		});
	},
	linkQuestionsGroupToAnEkloreQuestion(data) {
		check(data, Object);
		check(data.questionsGroupId, String);
		check(data.ekloreQuestionId, String);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				questionsGroupId: data.questionsGroupId
			}
		});
	},
	unlikQuestionGroupFromEkloreQuestion(data) {
		check(data, Object);
		check(data.ekloreQuestionId, String);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$unset: {
				questionsGroupId: ''
			}
		});
	},
	addWorkshopToEkloreQuestion(data) {
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.workshopId, String);
		check(data.matchingPower, Number);
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
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.workshopId, String);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				workshopsLinked: {
					workshopId: data.workshopId
				}
			}
		});
	},
	addUniverseToEkloreQuestion(data) {
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.universeId, String);
		check(data.matchingPower, Number);
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
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.universeId, String);
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				universesLinked: {
					universeId: data.universeId
				}
			}
		});
	},
	addUniverseToChoice(data) {
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.choiceId, String);
		check(data.universeId, String);
		check(data.matchingPower, Number);
		check(data.choiceIndex, Number);
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
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.choiceId, String);
		check(data.universeId, String);
		check(data.choiceIndex, Number);
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
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.choiceId, String);
		check(data.workshopId, String);
		check(data.matchingPower, Number);
		check(data.choiceIndex, Number);
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
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.choiceId, String);
		check(data.workshopId, String);
		check(data.choiceIndex, Number);
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
		check(data, Object);
		check(data.ekloreQuestionId, String);
		check(data.label, String);
		check(data.choiceIndex, Number);
		check(data.choiceId, String);
		let pos = 'choices.' + data.choiceIndex + '.label';
		return EkloreQuestions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				[pos]: data.label
			},
			$inc: {
				version: 1
			}
		});
	}
});
