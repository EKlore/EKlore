import { Meteor } from 'meteor/meteor';

import { Workshops } from '../schema.js';

Meteor.publish('Workshops.allWorkshops', () => {
	return Workshops.find({}, {
		fields: {
			name: 1,
			dateStart: 1,
			dateEnd: 1,
			universesLinked: 1,
			peopleToGo: 1
		}
	});
});

Meteor.publish('Workshops.allWorkshopsForTheDay', () => {
	return Workshops.find({}, {
		fields: {
			name: 1,
			description: 1,
			dateStart: 1,
			dateEnd: 1,
			peopleToGo: 1
		}
	});
});

Meteor.publish('Workshops.allWorkshopsLinkableToUniverse', () => {
	return Workshops.find({}, {
		fields: {
			name: 1
		}
	});
});

Meteor.publish('Workshops.aWorkshop', (workshopId) => {
	return Workshops.find({
		_id: workshopId
	});
});

Meteor.publish('Workshops.allWorkshopsToSee', () => {
	return Workshops.find({}, {
		fields: {
			name: 1,
			description: 1,
			dateStart: 1,
			dateEnd: 1,
			peopleToGo: 1
		}
	});
});
