import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import { Universes } from '../../../api/universes/schema.js';
import { Workshops } from '../../../api/workshops/schema.js';
import { EkloreQuestions } from '../../../api/ekloreQuestions/schema.js';
import { QuestionsGroups } from '../../../api/questionsGroups/schema.js';

import './editEkloreQuestion.jade';
import '../../components/choice/choice.js';
import '../../components/editDeprecated/editDeprecated.jade';
import '../../components/editDisplayType/editDisplayType.js';
import '../../components/universesToAddToEkloreQuestion/universesToAddToEkloreQuestion.js';
import '../../components/universesToRemoveFromEkloreQuestion/universesToRemoveFromEkloreQuestion.js';
import '../../components/workshopsToAddToEkloreQuestion/workshopsToAddToEkloreQuestion.js';
import '../../components/workshopsToRemoveFromEkloreQuestion/workshopsToRemoveFromEkloreQuestion.js';

Template.editEkloreQuestion.onCreated(function() {
	this.autorun(() => {
		this.subscribe('anEkloreQuestion', Router.current().params._id);
		this.subscribe('allQuestionsGroups');
		this.subscribe('allUniverses');
		this.subscribe('allWorkshops');
	});
});

Template.editEkloreQuestion.helpers({
	ekloreQuestion() {
		return EkloreQuestions.findOne(Router.current().params._id);
	},
	questionsGroupData() {
		return QuestionsGroups.findOne({ _id: this.questionsGroupId });
	},
	questionsGroups() {
		return QuestionsGroups.find({}, {
			fields: {
				title: 1,
				deprecated: 1
			}
		});
	},
	displayTypeText() {
		if (this.displayType === 'text') {
			return true;
		} else {
			return false;
		}
	},
	workshops() {
		if (!this.workshopsLinked || this.workshopsLinked.length === 0) {
			return Workshops.find({}, {
				fields: {
					name: 1
				}
			});
		} else {
			let qStart = { _id: { $nin: [] } };
			this.workshopsLinked.map((cur, index, array) => {
				return qStart._id['$nin'].push(cur.workshopId);
			});
			return Workshops.find(qStart, {
				fields: {
					name: 1
				}
			});
		}
	},
	universes() {
		if (!this.universesLinked || this.universesLinked.length === 0) {
			return Universes.find({}, {
				fields: {
					name: 1
				}
			});
		} else {
			let qStart = { _id: { $nin: [] } };
			this.universesLinked.map((cur, index, array) => {
				return qStart._id['$nin'].push(cur.universeId);
			});
			return Universes.find(qStart, {
				fields: {
					name: 1
				}
			});
		}
	}
});

Template.editEkloreQuestion.events({
	'click #save': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			title: $('#ekloreQuestionTitle').val(),
			level: Number($('#ekloreQuestionLevel').val())
		};
		if ($('input[name="deprecated"]:checked').val() === 'notDeprecated') {
			data.deprecated = false;
		} else if ($('input[name="deprecated"]:checked').val() === 'deprecated') {
			data.deprecated = true;
		}
		if ($('input[name="displayType"]:checked').val() === 'text') {
			data.displayType = 'text';
		} else if ($('input[name="displayType"]:checked').val() === 'picture') {
			data.displayType = 'picture';
		}
		if (!data.title) {
			return Bert.alert('Title must be filled', 'danger', 'growl-top-right');
		}
		if (!data.level) {
			return Bert.alert('Level must be filled', 'danger', 'growl-top-right');
		}
		if (data.level < 2) {
			return Bert.alert('The level must be superior to 1', 'danger', 'growl-top-right');
		}
		Meteor.call('updateAnEkloreQuestion', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	},
	'click #linkToEkloreQuestion': function(event) {
		event.preventDefault();
		let questionGroupId = this._id;
		let questionData = EkloreQuestions.findOne({ _id: Router.current().params._id });
		questionData.answered = false;
		questionData.userId = Meteor.userId();
		questionData.questionId = this._id;
		delete questionData._id;
		delete questionData.createdAt;
		delete questionData.questionsGroupId;
		Meteor.call('insertQuestion', questionData, (error, result) => {
			if (error) {
				return Bert.alert('The question configuration is not valid, please verify, Universes, Workshops and Choices', 'danger', 'growl-top-right');
			} else {
				Meteor.call('removeQuestion', result);
				const data = {
					ekloreQuestionId: Router.current().params._id,
					questionsGroupId: questionGroupId
				};
				Meteor.call('linkQuestionsGroupToAnEkloreQuestion', data, (error, result) => {
					if (error) {
						return Bert.alert(error.message, 'danger', 'growl-top-right');
					}
				});
			}
		});
	},
	'click #removeQuestionsGroupFromEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id
		};
		Meteor.call('unlikQuestionGroupFromEkloreQuestion', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
