Meteor.publish('allUniverses', function() {
	return Universes.find({});
});

Meteor.publish('anUniverse', function(universeId) {
	return Universes.find({
		_id: universeId
	});
});
