Template.editWorkshop.onRendered(() => {
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
	dateStart() {
		return moment(this.dateStart).format('YYYY-MM-D HH:mm');
	},
	dateEnd() {
		return moment(this.dateEnd).format('YYYY-MM-D HH:mm');
	},
	universes() {
		return Universes.find({
			'workshopsLinked.workshopId': {
				$ne: this._id
			}
		});
	}
});

Template.editWorkshop.events({
	'click #save': function(event) {
		event.preventDefault();
		var workshopData = {
			workshopId: Router.current().params._id,
			name: $('#workshopName').val(),
			description: $('#workshopDescription').val(),
			dateStart: moment($('#workshopDateStart').val()).toDate(),
			dateEnd: moment($('#workshopEndDate').val()).toDate()
		};
		if (!workshopData.name) {
			return throwError('Name must be filled');
		}
		if (!workshopData.description) {
			return throwError('Label must be filled');
		}
		if (!workshopData.dateStart) {
			return throwError('Date start must be filled');
		}
		if (!workshopData.dateEnd) {
			return throwError('Date end must be filled');
		}
		if (workshopData.dateEnd < workshopData.dateStart) {
			return throwError('Date start must be inferior to Date end');
		}
		Meteor.call('updateAWorkshop', workshopData, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				return throwError('Update succesful !');
			}
		});
	}
});
