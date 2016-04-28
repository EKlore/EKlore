Template.myProfile.helpers({
	questionsGroup() {
		return QuestionsGroups.find({ deprecated: false }, {
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
	universes() {
		return Universes.find({}, {
			sort: {
				name: 1
			},
			fields: {
				name: 1
			}
		});
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
