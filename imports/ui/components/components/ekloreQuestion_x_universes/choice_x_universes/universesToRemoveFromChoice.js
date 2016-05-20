Template.universesToRemoveFromChoice.helpers({
	universeData() {
		return Universes.findOne(this.universeId);
	}
});

Template.universesToRemoveFromChoice.events({
	'submit .removeUniverseFromChoice': function(event) {
		event.preventDefault();
		const data = {
			choiceId: Template.parentData(1).choiceId,
			ekloreQuestionId: Router.current().params._id,
			universeId: this.universeId
		};
		data.choiceIndex = lodash.findIndex(Template.parentData(2).choices, ['choiceId', data.choiceId]);
		Meteor.call('removeUniverseFromChoice', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
