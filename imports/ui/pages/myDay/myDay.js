import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Workshops } from '../../../api/workshops/schema.js';

import './myDay.jade';
import '../../components/connect/connect.js';

Template.myDay.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allWorkshopsForTheDay');
	});
});

Template.myDay.helpers({
	workshops() {
		return Workshops.find({}, {
			sort: {
				dateStart: 1,
				name: 1
			}
		});
	},
	universes() {
		let questions = UserQuestions.find({ userId: Meteor.userId(), answered: true, deprecated: false }, { fields: { result: 1 } }).fetch();
		let questionsObject = {};
		let questionsArray = [];
		questions.map((cur, index, array) => {
			cur.result.map((cur1, index1, array1) => {
				if (cur1.universeId) {
					if (questionsObject[cur1.universeId]) {
						questionsObject[cur1.universeId].value += cur1.result;
						questionsObject[cur1.universeId].long += 1;
					} else {
						questionsObject[cur1.universeId] = {
							value: cur1.result,
							long: 1
						};
					}
				}
			});
		});
		for (prop in questionsObject) {
			questionsArray.push({
				_id: prop,
				value: lodash.round(questionsObject[prop].value / questionsObject[prop].long * 100, 2),
				valueForCircle: lodash.round(questionsObject[prop].value / questionsObject[prop].long * 100 / 4 + 75, 0)
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
		Meteor.call('addUserToWorkshop', data, (error, result) => {
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
		Meteor.call('removeUserFromWorkshop', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
