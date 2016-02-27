Meteor.publish('allUniverses', function() {
	return Universes.find({});
});

Meteor.publish('aUniverse', function(universeId) {
	return Universes.find({
		_id: universeId
	});
});
