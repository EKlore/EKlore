Template.workshopsToAdd.events({
	'submit .addWorkshopToUniverse': function(event) {
		event.preventDefault();
		const workshopData = {
			universeId: Router.current().params._id,
			workshopId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		if (!workshopData.matchingPower) {
			return throwError('The matching power of the workshop must be filled');
		} else {
			if (workshopData.matchingPower <= 0) {
				return throwError('The matching power of the workshop must be superior to 0');
			} else if (workshopData.matchingPower > 1) {
				return throwError('The matching power of the workshop must be inferior to 1');
			} else {
				Meteor.call('addWorkshopToUniverse', workshopData, (error, result) => {
					if (error) {
						return throwError(error.message);
					} else {
						Meteor.call('addUniverseToWorkshop', workshopData, (error, result) => {
							if (error) {
								return throwError(error.message);
							}
						});
					}
				});
			}
		}
	}
});
