import { Meteor } from 'meteor/meteor';

import { Users } from '../schema.js';

Meteor.publish('Users.allUsers', () => {
	return Users.find({});
});
