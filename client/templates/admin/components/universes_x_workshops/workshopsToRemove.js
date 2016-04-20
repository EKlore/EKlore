Template.workshopsToRemove.helpers({
	workshopData() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.workshopsToRemove.events({
	'submit .removeWorkshopFromUniverse': function(event) {
		event.preventDefault();
		const data = {
			universeId: Router.current().params._id,
			workshopId: this.workshopId
		};
		Meteor.call('removeWorkshopFromUniverse', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				Meteor.call('removeUniverseFromWorkshop', data, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
	}
});
