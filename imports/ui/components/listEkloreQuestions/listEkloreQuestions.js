import { Template } from 'meteor/templating';

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
			}
		});
	}
});
