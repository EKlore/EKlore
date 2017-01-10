import { Meteor } from 'meteor/meteor';

import { Partners } from '../schema.js';

Meteor.publish('Partners.allPartners', () => {
	return Partners.find({}, {
		fields: {
			firstName: 1,
			lastName: 1,
			companyName: 1,
			pictureUrl: 1
		}
	});
});

Meteor.publish('Partners.allPartnersForWorkshop', (workshopId) => {
	return Partners.find({
		workshopsLinked: {
			workshopId
		}
	});
});

Meteor.publish('Partners.allPartnersForUniverses', () => {
	return Partners.find({
		universesLinked: {
			$size: 1
		}
	});
});

Meteor.publish('Partners.aPartner', (partnerId) => {
	return Partners.find({ _id: partnerId });
});
