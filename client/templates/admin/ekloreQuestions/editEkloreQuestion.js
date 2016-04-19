Template.editEkloreQuestion.helpers({
	questionGroupData() {
		return QuestionsGroups.findOne({ _id: this.questionGroupId });
	},
	questionsGroups() {
		return QuestionsGroups.find({
			deprecated: false
		}, {
			fields: {
				title: 1
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
			let qStart = { $and: [] };
			this.workshopsLinked.map((cur, index, array) => {
				let element = { _id: { $ne: cur.workshopId } };
				return qStart['$and'].push(element);
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
			let qStart = { $and: [] };
			this.universesLinked.map((cur, index, array) => {
				let element = { _id: { $ne: cur.universeId } };
				return qStart['$and'].push(element);
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
		const ekloreQuestion = {
			ekloreQuestionId: Router.current().params._id,
			title: $('#questionsGroupTitle').val(),
			level: Number($('#questionsGroupLevel').val())
		};
		if ($('input[name="deprecated"]:checked').val() === 'notDeprecated') {
			ekloreQuestion.deprecated = false;
		} else if ($('input[name="deprecated"]:checked').val() === 'deprecated') {
			ekloreQuestion.deprecated = true;
		}
		if (!ekloreQuestion.title) {
			return throwError('Name must be filled');
		}
		if (!ekloreQuestion.level) {
			return throwError('Level must be filled');
		}
		if (ekloreQuestion.level < 2) {
			return throwError('The level must be superior to 1');
		}
		Meteor.call('updateAQuestionsGroup', ekloreQuestion, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				return throwError('Update succesful !');
			}
		});
	},
	'click .linkToEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			questionGroupId: this._id
		};
		Meteor.call('linkQuestionGroupToAnEkloreQuestion', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	},
	'click #removeQuestionGroupFromEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id
		};
		Meteor.call('unlikQuestionGroupFromEkloreQuestion', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
