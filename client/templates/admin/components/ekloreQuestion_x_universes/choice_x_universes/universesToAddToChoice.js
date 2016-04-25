Template.universesToAddToChoice.events({
	'submit .addUniverseToEkloreQuestion': function(event) {
		event.preventDefault();
		const data = {
			choiceId: Template.parentData(1).choiceId,
			ekloreQuestionId: Router.current().params._id,
			universeId: this._id,
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
				Meteor.call('addUniverseToChoice', data, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		}
	}
});
