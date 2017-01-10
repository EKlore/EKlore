import { Meteor } from 'meteor/meteor';

Meteor.publish('retrieveAllUsers', () => {
	return Meteor.users.find({});
});
