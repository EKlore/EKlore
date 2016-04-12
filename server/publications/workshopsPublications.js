Meteor.publish('allWorkshops', () => {
	return Workshops.find({});
});

Meteor.publish('allWorkshopsLinkableToUniverse', () => {
	return Workshops.find({}, {
		fields: {
			name: 1
		}
	});
});

Meteor.publish('aWorkshop', (workshopId) => {
	return Workshops.find({
		_id: workshopId
	});
});
