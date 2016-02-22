Meteor.publish('allVolunteers', function() {
	return Volunteers.find({});
});
