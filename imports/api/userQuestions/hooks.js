import { Meteor } from 'meteor/meteor';
import { MethodHooks } from 'meteor/doctorpangloss:method-hooks';
import { lodash } from 'meteor/stevezhu:lodash';

import { UserQuestions } from './schema.js';

import './methods.js';

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
