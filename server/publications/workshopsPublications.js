Meteor.publish('allWorkshops', () => {
	return Workshops.find({});
});

Meteor.publish('aWorkshop', (workshopId) => {
	return Workshops.find({
		_id: workshopId
	});
});
