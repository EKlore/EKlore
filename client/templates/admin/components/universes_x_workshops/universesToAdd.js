Template.universesToAdd.events({
	'submit .addUniverseToWorkshop': function(event) {
		event.preventDefault();
		const data = {
			workshopId: Router.current().params._id,
			universeId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		if (!data.matchingPower) {
			return throwError('The matching power of the universe must be filled');
		} else {
			if (data.matchingPower <= 0) {
				return throwError('The matching power of the universe must be superior to 0');
			} else if (data.matchingPower > 1) {
				return throwError('The matching power of the universe must be inferior to 1');
			} else {
				Meteor.call('addUniverseToWorkshop', data, (error, result) => {
					if (error) {
						return throwError(error.message);
					} else {
						Meteor.call('addWorkshopToUniverse', data, (error, result) => {
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
