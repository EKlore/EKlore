import { Meteor } from 'meteor/meteor';

import { Universes } from '../schema.js';

Meteor.publish('allUniverses', () => {
	return Universes.find({}, {
		fields: {
			name: 1,
			label: 1,
			partner: 1,
			partnerLogo: 1,
			partnerDescription: 1,
			partnerWebsite: 1,
			location: 1,
			workshopsLinked: 1
		}
	});
});

Meteor.publish('allUniversesLinkableToWorkshop', () => {
	return Universes.find({}, {
		fields: {
			name: 1,
			color: 1
		}
	});
});


Meteor.publish('anUniverse', (universeId) => {
	return Universes.find({
		_id: universeId
	});
});
