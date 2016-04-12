Template.workshopsToRemove.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.workshopsToRemove.events({
	'submit .removeWorkshopFromUniverse': function(event) {
		event.preventDefault();
		const workshopData = {
			universeId: Router.current().params._id,
			workshopId: this.workshopId
		};
		Meteor.call('removeWorkshopFromUniverse', workshopData, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				Meteor.call('removeUniverseFromWorkshop', workshopData, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
	}
});
