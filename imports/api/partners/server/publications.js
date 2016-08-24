import { Meteor } from 'meteor/meteor';

import { Partners } from '../schema.js';

Meteor.publish('allPartners', () => {
	return Partners.find({});
});

Meteor.publish('allPartnersForWorkshop', (workshopId) => {
	return Partners.find({
		workshopsLinked: {
			workshopId
		}
	});
});

Meteor.publish('aPartner', (partnerId) => {
	return Partners.find({ _id: partnerId });
});
