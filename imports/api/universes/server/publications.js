import { Meteor } from 'meteor/meteor';

import { Universes } from '../schema.js';

Meteor.publish('Universes.allUniverses', () => {
	return Universes.find({}, {
		fields: {
			name: 1,
			label: 1,
			partner: 1,
			partnerLogo: 1,
			universeLogo: 1,
			partnerDescription: 1,
			partnerWebsite: 1,
			location: 1,
			workshopsLinked: 1
		}
	});
});

Meteor.publish('Universes.allUniversesLinkableToWorkshop', () => {
	return Universes.find({}, {
		fields: {
			name: 1,
			color: 1
		}
	});
});


Meteor.publish('Universes.anUniverse', (universeId) => {
	return Universes.find({
		_id: universeId
	});
});
