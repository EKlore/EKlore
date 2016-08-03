import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { EkloreQuestions } from '../../../api/ekloreQuestions/schema.js';
import { validateScaleEkloreQuestion, validateYesNoEkloreQuestion, validateQcmEkloreQuestion, validateChoiceEkloreQuestion } from '../../../startup/client/lib/sharedFunctions.js';

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
				deprecated: 1,
				universesLinked: 1,
				workshopsLinked: 1,
				choices: 1
			}
		});
	},
	myIndex(index) {
		return index + 1;
	},
	moreThanOneChoice() {
		if (this.choices.length > 1) {
			return true;
		} else {
			return false;
		}
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
	oneChoiceAtLeastIsOK() {
		let choices = this.choices;
		let ok = 0;
		let total = choices.length;
		choices.map((cur, index, array) => {
			if (validateChoiceEkloreQuestion(cur)) {
				return ok++;
			}
		});
		if (ok) {
			return `${ok} / ${total}`;
		} else {
			return false;
		}
	}
});
