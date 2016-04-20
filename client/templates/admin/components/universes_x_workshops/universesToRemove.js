Template.universesToRemove.helpers({
	universeData() {
		return Universes.findOne(this.universeId);
	}
});

Template.universesToRemove.events({
	'submit .removeUniverseFromWorkshop': function(event) {
		event.preventDefault();
		const data = {
			workshopId: Router.current().params._id,
			universeId: this.universeId
		};
		Meteor.call('removeUniverseFromWorkshop', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				Meteor.call('removeWorkshopFromUniverse', data, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
	}
});
