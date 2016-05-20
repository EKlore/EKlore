Template.choice.helpers({
	idForChoice() {
		return 'choice_' + this.choiceId;
	},
	collapseChoice() {
		return 'collapse_' + this.choiceId;
	},
	universes() {
		if (!Template.parentData(1).universesLinked || Template.parentData(1).universesLinked.length === 0) {
			return false;
		} else if (!this.universesLinked || this.universesLinked.length === 0) {
			let qStart = { _id: { $in: [] } };
			Template.parentData(1).universesLinked.map((cur, index, array) => {
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
			Template.parentData(1).universesLinked.map((cur, index, array) => {
				return qIn._id['$in'].push(cur.universeId);
			});
			this.universesLinked.map((cur, index, array) => {
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
			Template.parentData(1).workshopsLinked.map((cur, index, array) => {
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
			Template.parentData(1).workshopsLinked.map((cur, index, array) => {
				return qIn._id['$in'].push(cur.workshopId);
			});
			this.workshopsLinked.map((cur, index, array) => {
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
			return throwError('Label must be filled');
		}
		Meteor.call('updateAChoice', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				return throwError('Update succesful !');
			}
		});
	}
});
