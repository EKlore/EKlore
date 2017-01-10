import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const universeLinkedToUserQuestionsSchema = new SimpleSchema({
	universeId: { type: String },
	matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
});

const workshopLinkedToUserQuestionsSchema = new SimpleSchema({
	workshopId: { type: String },
	matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
});

const choicesLinkedToUserQuestionsSchema = new SimpleSchema({
	choiceId: { type: String },
	label: { type: String },
	universesLinked: { type: [universeLinkedToUserQuestionsSchema], minCount: 1 },
	workshopsLinked: { type: [workshopLinkedToUserQuestionsSchema], minCount: 1 }
});

export const userQuestionSchema = new SimpleSchema({
	title: { type: String },
	level: { type: Number, min: 1 },
	displayType: { type: String, allowedValues: ['yesNo', 'qcm', 'scale'] },
	version: { type: Number, min: 1 },
	deprecated: { type: Boolean },
	choices: { type: [choicesLinkedToUserQuestionsSchema], minCount: 2 },
	universesLinked: { type: [universeLinkedToUserQuestionsSchema], minCount: 1 },
	workshopsLinked: { type: [workshopLinkedToUserQuestionsSchema], minCount: 1 },
	answered: { type: Boolean },
	userId: { type: String },
	questionId: { type: String },
	questionGroupId: { type: String }
});
