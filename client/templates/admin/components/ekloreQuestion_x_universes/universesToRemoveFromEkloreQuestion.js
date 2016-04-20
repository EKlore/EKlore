Template.universesToRemoveFromEkloreQuestion.helpers({
	universeData() {
		return Universes.findOne(this.universeId);
	}
});

Template.universesToRemoveFromEkloreQuestion.events({
	'submit .removeUniverseFromEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			universeId: this.universeId
		};
		Meteor.call('removeUniverseFromEkloreQuestion', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
