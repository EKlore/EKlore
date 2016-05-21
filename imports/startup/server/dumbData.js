import { Meteor } from 'meteor/meteor';

import { Volunteers } from '../../api/volunteers/schema.js';

Meteor.startup(() => {
	if (Volunteers.find({}).count() === 0) {
		var volunteers = [{
			firstName: 'Solenn',
			lastName: 'Thomas',
			pictureUrl: '/volunteers/solenn_thomas.jpg',
			functionInFete: 'Fondatrice d\'EKlore et de FETE'
		}, {
			firstName: 'Jeremy',
			lastName: 'Fourna',
			pictureUrl: '/volunteers/jeremy_fourna.jpg',
			functionInFete: 'Développeur de ce site !'
		}, {
			firstName: 'Alizée',
			lastName: 'Thurneyssen',
			functionInFete: 'Responsable programmation'
		}];
		for (var j = 0; j < volunteers.length; j++) {
			Meteor.call('addAVolunteer', volunteers[j], (error, result) => {
				if (error) {
					return throwError(error.message);
				}
			});
		}
	}
});
