Template.workshopsToRemoveFromChoice.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.workshopsToRemoveFromChoice.events({
	'submit .removeWorkshopFromChoice': function(event) {
		event.preventDefault();
		const data = {
			choiceId: Template.parentData(1).choiceId,
			ekloreQuestionId: Router.current().params._id,
			workshopId: this.workshopId
		};
		data.choiceIndex = lodash.findIndex(Template.parentData(2).choices, ['choiceId', data.choiceId]);
		Meteor.call('removeWorkshopFromChoice', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
