import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsers', () => {
	return Meteor.users.find({});
});
