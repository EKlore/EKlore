Volunteers = new Mongo.Collection('volunteers');

var Schemas = {};

Schemas.Volunteers = new SimpleSchema({
	firstName: {
		type: String,
		label: 'Volunteer firstname'
	},
	lastName: {
		type: String,
		label: 'Volunteer lastname'
	},
	pictureUrl: {
		type: String,
		label: 'User choice',
		optional: true
	},
	functionInFete: {
		type: String,
		label: 'Volunteer function in FETE',
		optional: true
	}
});

Volunteers.attachSchema(Schemas.Volunteers);

Meteor.methods({
	addAVolunteer(volunteerData) {
		check(volunteerData.firstName, String);
		check(volunteerData.lastName, String);
		if (!volunteerData.pictureUrl) {
			volunteerData.pictureUrl = '/volunteers/no_picture.jpeg';
		}
		return Volunteers.insert(volunteerData);
	}
});
