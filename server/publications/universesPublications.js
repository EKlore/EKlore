Meteor.publish('allUniverses', () => {
	return Universes.find({}, {
		fields: {
			name: 1,
			label: 1,
			workshopsLinked: 1
		}
	});
});

Meteor.publish('allUniversesLinkableToWorkshop', () => {
	return Universes.find({}, {
		fields: {
			name: 1
		}
	});
});


Meteor.publish('anUniverse', (universeId) => {
	return Universes.find({
		_id: universeId
	});
});
