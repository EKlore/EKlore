Template.myProfile.helpers({
	userHasQuestionsGroupsInProfile() {
		if (!Meteor.user().profile.questionsGroups || Meteor.user().profile.questionsGroups.length === 0) {
			return false;
		} else {
			return true;
		}
	},
	questionsGroup() {
		let questionsGroupCurrentlyInUser = Meteor.user().profile.questionsGroups;
		return QuestionsGroups.find({
			_id: {
				$nin: questionsGroupCurrentlyInUser
			},
			deprecated: false
		}, {
			sort: {
				title: 1
			},
			fields: {
				deprecated: 1,
				title: 1,
				label: 1
			}
		});
	},
	notAnsweredQuestions() {
		return UserQuestions.find({
			userId: Meteor.userId(),
			answered: false,
			deprecated: false
		}).count();
	},
	universes() {
		let questions = UserQuestions.find({
			userId: Meteor.userId(),
			answered: true,
			deprecated: false
		}, {
			fields: {
				result: 1
			}
		}).fetch();
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
				value: lodash.round(questionsObject[prop].value / questionsObject[prop].long * 100, 2)
			});
		}
		return questionsArray;
	},
	perc() {
		return Math.ceil(Math.random() * 100);
	}
});

Template.myProfile.events({
	'click .addQuestionsGroupToUser': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: this._id,
			userId: Meteor.userId()
		};
		Meteor.call('addQuestionsGroupToUser', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
