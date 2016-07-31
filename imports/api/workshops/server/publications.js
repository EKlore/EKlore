import { Meteor } from 'meteor/meteor';

import { Workshops } from '../schema.js';

Meteor.publish('allWorkshops', () => {
	return Workshops.find({}, {
		fields: {
			name: 1,
			dateStart: 1,
			dateEnd: 1,
			universesLinked: 1
		}
	});
});

Meteor.publish('allWorkshopsForTheDay', () => {
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

Meteor.publish('allWorkshopsLinkableToUniverse', () => {
	return Workshops.find({}, {
		fields: {
			name: 1
		}
	});
});

Meteor.publish('aWorkshop', (workshopId) => {
	return Workshops.find({
		_id: workshopId
	});
});

Meteor.publish('allWorkshopsToSee', () => {
	return Workshops.find({}, {
		fields: {
			name: 1,
			description: 1,
			speaker: 1,
			format: 1
		}
	});
});
