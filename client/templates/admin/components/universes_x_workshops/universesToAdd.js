Template.universesToAdd.events({
	'submit .addUniverseToWorkshop': function(event) {
		event.preventDefault();
		const universeData = {
			workshopId: Router.current().params._id,
			universeId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		if (!universeData.matchingPower) {
			return throwError('The matching power of the universe must be filled');
		} else {
			if (universeData.matchingPower <= 0) {
				return throwError('The matching power of the universe must be superior to 0');
			} else if (universeData.matchingPower > 1) {
				return throwError('The matching power of the universe must be inferior to 1');
			} else {
				Meteor.call('addUniverseToWorkshop', universeData, (error, result) => {
					if (error) {
						return throwError(error.message);
					} else {
						Meteor.call('addWorkshopToUniverse', universeData, (error, result) => {
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
