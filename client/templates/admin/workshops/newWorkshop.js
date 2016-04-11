Template.newWorkshop.onRendered(() => {
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

Template.newWorkshop.events({
	'click #addWorkshop': function(event) {
		event.preventDefault();
		var workshop = {
			name: $('#workshopName').val(),
			description: $('#workshopDescription').val(),
			dateStart: moment($('#workshopDateStart').val()).toDate(),
			dateEnd: moment($('#workshopEndDate').val()).toDate()
		};
		if (!workshop.name) {
			return throwError('Name must be filled');
		}
		if (!workshop.description) {
			return throwError('Description must be filled');
		}
		if (!workshop.dateStart) {
			return throwError('Date start must be filled');
		}
		if (!workshop.dateEnd) {
			return throwError('Date end must be filled');
		}
		if (workshop.dateEnd < workshop.dateStart) {
			return throwError('Date start must be inferior to Date end');
		}
		Meteor.call('addAWorkshop', workshop, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				Router.go('editWorkshop', { _id: result });
			}
		});
	}
});
