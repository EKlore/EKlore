Meteor.publish('allWorkshops', function() {
	return Workshops.find({});
});

Meteor.publish('aWorkshop', function(workshopId) {
	return Workshops.find({
		_id: workshopId
	});
});
