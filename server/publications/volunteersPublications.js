Meteor.publish('allVolunteers', () => {
	return Volunteers.find({});
});
