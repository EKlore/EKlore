import { Template } from 'meteor/templating';

import { QuestionsGroups } from '../../../api/questionsGroups/schema.js';
import { EkloreQuestions } from '../../../api/ekloreQuestions/schema.js';

import './listQuestionsGroups.jade';

Template.listQuestionsGroups.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allQuestionsGroups');
		this.subscribe('allEkloreQuestionsForCountQuestionsGroups');
	});
});

Template.listQuestionsGroups.helpers({
	questionsGroupsCount() {
		return QuestionsGroups.find({}).count();
	},
	questionsGroup() {
		return QuestionsGroups.find({}, {
			sort: {
				title: 1
			}
		});
	},
	ekloreQuestionsLinkedCount() {
		return EkloreQuestions.find({
			questionsGroupId: this._id
		}).count();
	}
});
