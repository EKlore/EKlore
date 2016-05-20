Template.workshopsToAddToEkloreQuestion.events({
	'submit .addWorkshopToEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			ekloreQuestionId: Router.current().params._id,
			workshopId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		if (!data.matchingPower) {
			return throwError('The matching power of the workshop must be filled');
		} else {
			if (data.matchingPower <= 0) {
				return throwError('The matching power of the workshop must be superior to 0');
			} else if (data.matchingPower > 1) {
				return throwError('The matching power of the workshop must be inferior to 1');
			} else {
				Meteor.call('addWorkshopToEkloreQuestion', data, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		}
	}
});
