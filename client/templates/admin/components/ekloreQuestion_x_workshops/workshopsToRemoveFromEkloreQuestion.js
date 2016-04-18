Template.workshopsToRemoveFromEkloreQuestion.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.workshopsToRemoveFromEkloreQuestion.events({
	'submit .removeWorkshopFromEkloreQuestion': function(event) {
		event.preventDefault();
		const workshopData = {
			universeId: Router.current().params._id,
			workshopId: this.workshopId
		};
		Meteor.call('removeWorkshopFromEkloreQuestion', workshopData, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
