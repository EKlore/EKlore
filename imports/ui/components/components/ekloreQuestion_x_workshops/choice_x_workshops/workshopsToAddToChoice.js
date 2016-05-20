Template.workshopsToAddToChoice.events({
	'submit .addWorkshopToChoice': function(event) {
		event.preventDefault();
		const data = {
			choiceId: Template.parentData(1).choiceId,
			ekloreQuestionId: Router.current().params._id,
			workshopId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		data.choiceIndex = lodash.findIndex(Template.parentData(2).choices, ['choiceId', data.choiceId]);
		if (!data.matchingPower) {
			return throwError('The matching power of the universe must be filled');
		} else {
			if (data.matchingPower <= 0) {
				return throwError('The matching power of the universe must be superior to 0');
			} else if (data.matchingPower > 1) {
				return throwError('The matching power of the universe must be inferior to 1');
			} else {
				Meteor.call('addWorkshopToChoice', data, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		}
	}
});
