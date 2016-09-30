import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';
import { Bert } from 'meteor/themeteorchef:bert';
import { moment } from 'meteor/momentjs:moment';
import 'meteor/sacha:spin';

import { Workshops } from '../../../api/workshops/schema.js';
import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './myDay.jade';
import '../../components/connect/connect.js';

Template.myDay.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allWorkshopsForTheDay');
		this.subscribe('resultForQuestionsAnswered', Meteor.userId());
	});
});

Template.myDay.helpers({
	workshopData() {
		return Workshops.findOne({ _id: this._id }, {
			fields: {
				name: 1,
				dateStart: 1,
				dateEnd: 1,
				color: 1,
				peopleToGo: 1,
				description: 1
			}
		});
	},
	workshopColor(index) {
		if (index % 2 === 0) {
			return 'grey2';
		} else {
			return false;
		}
	},
	customWorkshops() {
		let questions = UserQuestions.find({ userId: Meteor.userId(), answered: true, deprecated: false }, { fields: { result: 1 } }).fetch();
		let questionsObject = {};
		let questionsArray = [];
		questions.map((cur) => {
			cur.result.map((cur1) => {
				if (cur1.workshopId) {
					if (questionsObject[cur1.workshopId]) {
						questionsObject[cur1.workshopId].value += cur1.result;
						questionsObject[cur1.workshopId].long += 1;
					} else {
						questionsObject[cur1.workshopId] = {
							value: cur1.result,
							long: 1
						};
					}
				}
			});
		});
		for (var prop in questionsObject) {
			questionsArray.push({
				_id: prop,
				value: lodash.round(questionsObject[prop].value / questionsObject[prop].long * 100, 2)
			});
		}
		questionsArray.sort((a, b) => {
			if (a.value < b.value) {
				return 1;
			} else if (a.value > b.value) {
				return -1;
			} else {
				return 0;
			}
		});
		return questionsArray;
	},
	dateStart() {
		return moment(this.dateStart).format('H:mm');
	},
	dateEnd() {
		return moment(this.dateEnd).format('H:mm');
	},
	isUserAlreadyIn() {
		if (lodash.findIndex(this.peopleToGo, ['userId', Meteor.userId()]) !== -1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.myDay.events({
	'click .goToWorkshop': function(event) {
		event.preventDefault();
		const data = {
			userId: Meteor.userId(),
			workshopId: this._id
		};
		Meteor.call('addUserToWorkshop', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click .removeFromWorkshop': function(event) {
		event.preventDefault();
		const data = {
			userId: Meteor.userId(),
			workshopId: this._id
		};
		Meteor.call('removeUserFromWorkshop', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
