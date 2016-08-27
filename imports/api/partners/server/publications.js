import { Meteor } from 'meteor/meteor';

import { Partners } from '../schema.js';

Meteor.publish('allPartners', () => {
	return Partners.find({}, {
		fields: {
			firstName: 1,
			lastName: 1,
			companyName: 1,
			picture: 1
		}
	});
});

Meteor.publish('allPartnersForWorkshop', (workshopId) => {
	return Partners.find({
		workshopsLinked: {
			workshopId
		}
	});
});

Meteor.publish('allPartnersForUniverses', () => {
	return Partners.find({
		universesLinked: {
			$size: 1
		}
	});
});

Meteor.publish('aPartner', (partnerId) => {
	return Partners.find({ _id: partnerId });
});
