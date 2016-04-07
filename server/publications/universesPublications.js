Meteor.publish('allUniverses', () => {
	return Universes.find({});
});

Meteor.publish('anUniverse', (universeId) => {
	return Universes.find({
		_id: universeId
	});
});
