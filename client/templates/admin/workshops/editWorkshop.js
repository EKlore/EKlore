Template.editWorkshop.onRendered(function() {
	$('#workshopDateStart').datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		weekStart: 1,
		autoclose: true,
		language: 'fr',
		minuteStep: 15
	});
	$('#workshopEndDate').datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		weekStart: 1,
		autoclose: true,
		language: 'fr',
		minuteStep: 15
	});
});

Template.editWorkshop.helpers({
	dateStart: function() {
		return moment(this.dateStart).format("YYYY-MM-D HH:mm");
	},
	dateEnd: function() {
		return moment(this.dateEnd).format("YYYY-MM-D HH:mm");
	}
});

Template.editWorkshop.helpers({
	universes: function() {
		return Universes.find({
			'workshopsLinked.workshopId': {
				$ne: this._id
			}
		});
	},
	universeData: function() {
		return Universes.findOne(this.universeId);
	}
});

Template.editWorkshop.events({
	'submit .addUniverseToWorkshop': function(event) {
		event.preventDefault();
		var universeData = {
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
				Meteor.call('addUniverseToWorkshop', universeData, function(error, result) {
					if (error) {
						return throwError(error.message);
					} else {
						Meteor.call('addWorkshopToUniverse', universeData, function(error, result) {
							if (error) {
								return throwError(error.message);
							}
						});
					}
				});
			}
		}
	},
	'submit .removeUniverseFromWorkshop': function(event) {
		event.preventDefault();
		var universeData = {
			workshopId: Router.current().params._id,
			universeId: this.universeId,
		};
		Meteor.call('removeUniverseFromWorkshop', universeData, function(error, result) {
			if (error) {
				return throwError(error.message);
			} else {
				Meteor.call('removeWorkshopFromUniverse', universeData, function(error, result) {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
	}
});
