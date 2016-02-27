Template.editUniverse.helpers({
	workshops: function() {
		return Workshops.find({
			'universesLinked.universeId': {
				$ne: this._id
			}
		});
	},
	workshopData: function() {
		return Workshops.findOne(this.workshopId);
	}
});

Template.editUniverse.events({
	'submit .addWorkshopToUniverse': function(event) {
		event.preventDefault();
		var workshopData = {
			universeId: Router.current().params._id,
			workshopId: this._id,
			matchingPower: Number($(event.target).find('.matchingPower').val())
		};
		var universeData = {
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
				Meteor.call('addWorkshopToUniverse', workshopData, function(error, result) {
					if (error) {
						return throwError(error.message);
					} else {
						Meteor.call('addUniverseToWorkshop', universeData, function(error, result) {
							if (error) {
								return throwError(error.message);
							}
						});
					}
				});
			}
		}
	},
	'submit .removeWorkshopFromUniverse': function(event) {
		event.preventDefault();
		var workshopData = {
			universeId: Router.current().params._id,
			workshopId: this.workshopId,
		};
		var universeData = {
			universeId: Router.current().params._id,
			workshopId: this.workshopId,
		};
		Meteor.call('removeWorkshopFromUniverse', workshopData, function(error, result) {
			if (error) {
				return throwError(error.message);
			} else {
				Meteor.call('removeUniverseFromWorkshop', universeData, function(error, result) {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
	}
});
