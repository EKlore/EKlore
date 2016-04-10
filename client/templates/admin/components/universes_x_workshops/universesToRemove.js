Template.universesToRemove.helpers({
	universeData() {
		return Universes.findOne(this.universeId);
	}
});

Template.universesToRemove.events({
	'submit .removeUniverseFromWorkshop': function(event) {
		event.preventDefault();
		var universeData = {
			workshopId: Router.current().params._id,
			universeId: this.universeId
		};
		Meteor.call('removeUniverseFromWorkshop', universeData, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				Meteor.call('removeWorkshopFromUniverse', universeData, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
	}
});
