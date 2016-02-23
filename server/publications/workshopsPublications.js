Meteor.publish('allWorkshops', function() {
	return Workshops.find({});
});
