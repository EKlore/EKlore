import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { EkloreQuestions } from '../../../api/ekloreQuestions/schema.js';
import { QuestionsGroups } from '../../../api/questionsGroups/schema.js';

import './editQuestionsGroup.jade';
import '../../components/deprecated/deprecated.jade';
import '../../components/editDeprecated/editDeprecated.jade';

Template.editQuestionsGroup.onCreated(function() {
	this.autorun(() => {
		this.subscribe('aQuestionsGroup', Router.current().params._id);
		this.subscribe('ekloreQuestionsLinkedToQuestionsGroup', Router.current().params._id);
	});
});

Template.editQuestionsGroup.helpers({
	questionsGroup() {
		return QuestionsGroups.findOne({ _id: Router.current().params._id });
	},
	ekloreQuestionsLinked() {
		return EkloreQuestions.find({ questionsGroupId: this._id });
	}
});

Template.editQuestionsGroup.events({
	'click #save': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: Router.current().params._id,
			title: $('#questionsGroupTitle').val(),
			label: $('#questionsGroupLabel').val(),
			level: Number($('#questionsGroupLevel').val())
		};
		if ($('input[name="deprecated"]:checked').val() === 'notDeprecated') {
			data.deprecated = false;
		} else if ($('input[name="deprecated"]:checked').val() === 'deprecated') {
			data.deprecated = true;
		}
		if (!data.title) {
			return Bert.alert('Title must be filled', 'danger', 'growl-top-right');
		}
		if (!data.label) {
			return Bert.alert('Label must be filled', 'danger', 'growl-top-right');
		}
		if (!data.level) {
			return Bert.alert('Level must be filled', 'danger', 'growl-top-right');
		}
		if (data.level < 2) {
			return Bert.alert('The level must be superior to 1', 'danger', 'growl-top-right');
		}
		Meteor.call('updateAQuestionsGroup', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	}
});
