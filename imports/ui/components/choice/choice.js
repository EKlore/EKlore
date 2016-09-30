import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { lodash } from 'meteor/stevezhu:lodash';
import { Bert } from 'meteor/themeteorchef:bert';

import { Universes } from '../../../api/universes/schema.js';
import { Workshops } from '../../../api/workshops/schema.js';
import { validateChoiceEkloreQuestion } from '../../../startup/client/lib/sharedFunctions.js';

import './choice.jade';
import '../../components/universesToAddToChoice/universesToAddToChoice.js';
import '../../components/universesToRemoveFromChoice/universesToRemoveFromChoice.js';
import '../../components/workshopsToAddToChoice/workshopsToAddToChoice.js';
import '../../components/workshopsToRemoveFromChoice/workshopsToRemoveFromChoice.js';

Template.choice.helpers({
	idForChoice() {
		return 'choice_' + this.choiceId;
	},
	collapseChoice() {
		return 'collapse_' + this.choiceId;
	},
	ifChoiceValid() {
		return validateChoiceEkloreQuestion(this);
	},
	displayTypeQcm() {
		if (Template.parentData(1).displayType === 'qcm') {
			return true;
		} else {
			return false;
		}
	},
	universes() {
		if (!Template.parentData(1).universesLinked || Template.parentData(1).universesLinked.length === 0) {
			return false;
		} else if (!this.universesLinked || this.universesLinked.length === 0) {
			let qStart = { _id: { $in: [] } };
			Template.parentData(1).universesLinked.map((cur) => {
				return qStart._id['$in'].push(cur.universeId);
			});
			return Universes.find(qStart, {
				fields: {
					name: 1
				}
			});
		} else {
			let qStart = { $and: [] };
			let qIn = { _id: { $in: [] } };
			let qNin = { _id: { $nin: [] } };
			Template.parentData(1).universesLinked.map((cur) => {
				return qIn._id['$in'].push(cur.universeId);
			});
			this.universesLinked.map((cur) => {
				return qNin._id['$nin'].push(cur.universeId);
			});
			qStart['$and'].push(qIn, qNin);
			return Universes.find(qStart, {
				fields: {
					name: 1
				}
			});
		}
	},
	workshops() {
		if (!Template.parentData(1).workshopsLinked || Template.parentData(1).workshopsLinked.length === 0) {
			return false;
		} else if (!this.workshopsLinked || this.workshopsLinked.length === 0) {
			let qStart = { _id: { $in: [] } };
			Template.parentData(1).workshopsLinked.map((cur) => {
				return qStart._id['$in'].push(cur.workshopId);
			});
			return Workshops.find(qStart, {
				fields: {
					name: 1
				}
			});
		} else {
			let qStart = { $and: [] };
			let qIn = { _id: { $in: [] } };
			let qNin = { _id: { $nin: [] } };
			Template.parentData(1).workshopsLinked.map((cur) => {
				return qIn._id['$in'].push(cur.workshopId);
			});
			this.workshopsLinked.map((cur) => {
				return qNin._id['$nin'].push(cur.workshopId);
			});
			qStart['$and'].push(qIn, qNin);
			return Workshops.find(qStart, {
				fields: {
					name: 1
				}
			});
		}
	}
});

Template.choice.events({
	'submit .saveLabel': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			choiceId: this.choiceId,
			label: $(event.target).find('#' + this.choiceId).val()
		};
		data.choiceIndex = lodash.findIndex(Template.parentData(1).choices, ['choiceId', data.choiceId]);
		if (!data.label) {
			return Bert.alert('Label must be filled', 'danger', 'growl-top-right');
		}
		Meteor.call('updateAChoice', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Update successful', 'success', 'growl-top-right');
			}
		});
	},
	'click .removeChoiceFromEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			choiceId: this.choiceId
		};
		Meteor.call('removeChoiceFromEkloreQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
