Template.editEkloreQuestion.helpers({
	questionsGroupData() {
		return QuestionsGroups.findOne({ _id: this.questionsGroupId });
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
			let qStart = { _id: { $nin: [] } };
			this.workshopsLinked.map((cur, index, array) => {
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
			this.universesLinked.map((cur, index, array) => {
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
		if ($('input[name="displayType"]:checked').val() === 'text') {
			data.displayType = 'text';
		} else if ($('input[name="displayType"]:checked').val() === 'picture') {
			data.displayType = 'picture';
		}
		if (!data.title) {
			return throwError('title must be filled');
		}
		if (!data.level) {
			return throwError('Level must be filled');
		}
		if (data.level < 2) {
			return throwError('The level must be superior to 1');
		}
		Meteor.call('updateAnEkloreQuestion', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				return throwError('Update succesful !');
			}
		});
	},
	'click #linkToEkloreQuestion': function(event) {
		event.preventDefault();
		let questionGroupId = this._id;
		let questionData = EkloreQuestions.findOne({ _id: Router.current().params._id });
		questionData.answered = false;
		questionData.userId = Meteor.userId();
		questionData.questionId = this._id;
		delete questionData._id;
		delete questionData.createdAt;
		delete questionData.questionsGroupId;
		Meteor.call('insertQuestion', questionData, (error, result) => {
			if (error) {
				return throwError("The question configuration is not valid, please verify, Universes, Workshops and Choices");
			} else {
				Meteor.call('removeQuestion', result);
				const data = {
					ekloreQuestionId: Router.current().params._id,
					questionsGroupId: questionGroupId
				};
				Meteor.call('linkQuestionsGroupToAnEkloreQuestion', data, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
	},
	'click #removeQuestionsGroupFromEkloreQuestion': function(event) {
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
