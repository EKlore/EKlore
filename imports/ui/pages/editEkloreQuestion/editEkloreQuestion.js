import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Universes } from '../../../api/universes/schema.js';
import { Workshops } from '../../../api/workshops/schema.js';
import { EkloreQuestions } from '../../../api/ekloreQuestions/schema.js';
import { QuestionsGroups } from '../../../api/questionsGroups/schema.js';
import { validateScaleEkloreQuestion, validateYesNoEkloreQuestion, validateQcmEkloreQuestion } from '../../../startup/client/lib/sharedFunctions.js';

import './editEkloreQuestion.jade';
import '../../components/choice/choice.js';
import '../../components/editDeprecated/editDeprecated.jade';
import '../../components/universesToAddToEkloreQuestion/universesToAddToEkloreQuestion.js';
import '../../components/universesToRemoveFromEkloreQuestion/universesToRemoveFromEkloreQuestion.js';
import '../../components/workshopsToAddToEkloreQuestion/workshopsToAddToEkloreQuestion.js';
import '../../components/workshopsToRemoveFromEkloreQuestion/workshopsToRemoveFromEkloreQuestion.js';

Template.editEkloreQuestion.onCreated(function() {
	this.autorun(() => {
		this.subscribe('EkloreQuestions.anEkloreQuestion', Router.current().params._id);
		this.subscribe('EkloreQuestions.allQuestionsGroups');
		this.subscribe('EkloreQuestions.allUniverses');
		this.subscribe('EkloreQuestions.allWorkshops');
	});
});

Template.editEkloreQuestion.helpers({
	ekloreQuestion() {
		return EkloreQuestions.findOne({ _id: Router.current().params._id });
	},
	isEkloreQuestionValid() {
		let that = JSON.parse(JSON.stringify(this));
		that.questionId = this._id;
		delete that.createdAt;
		delete that.questionsGroupId;
		if (this.displayType === 'scale') {
			return validateScaleEkloreQuestion(that);
		} else if (this.displayType === 'yesNo') {
			return validateYesNoEkloreQuestion(that);
		} else if (this.displayType === 'qcm') {
			return validateQcmEkloreQuestion(that);
		}
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
	displayTypeQcm() {
		if (this.displayType === 'qcm') {
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
			this.workshopsLinked.map((cur) => {
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
			this.universesLinked.map((cur) => {
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
		if (!data.title) {
			return Bert.alert('Title must be filled', 'danger', 'growl-top-right');
		}
		if (!data.level) {
			return Bert.alert('Level must be filled', 'danger', 'growl-top-right');
		}
		if (data.level < 2) {
			return Bert.alert('The level must be superior to 1', 'danger', 'growl-top-right');
		}
		Meteor.call('EkloreQuestions.updateAnEkloreQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	},
	'click #linkToEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			questionsGroupId: this._id
		};
		Meteor.call('EkloreQuestions.linkQuestionsGroupToAnEkloreQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click #removeQuestionsGroupFromEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id
		};
		Meteor.call('EkloreQuestions.unlikQuestionGroupFromEkloreQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click #addAChoice': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id
		};
		Meteor.call('EkloreQuestions.addChoiceToEkloreQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
