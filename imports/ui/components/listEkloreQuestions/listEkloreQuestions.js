import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { EkloreQuestions } from '../../../api/ekloreQuestions/schema.js';

import './listEkloreQuestions.jade';
import '../deprecated/deprecated.jade';
import '../linkedToQuestionsGroup/linkedToQuestionsGroup.jade';

Template.listEkloreQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allEkloreQuestions');
	});
});

Template.listEkloreQuestions.helpers({
	ekloreQuestionsCount() {
		return EkloreQuestions.find({}).count();
	},
	ekloreQuestions() {
		return EkloreQuestions.find({}, {
			sort: {
				title: 1
			},
			fields: {
				title: 1,
				version: 1,
				displayType: 1,
				questionsGroupId: 1,
				deprecated: 1
			}
		});
	}
});
