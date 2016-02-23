Meteor.publish('allUniverses', function() {
	return Universes.find({});
});
