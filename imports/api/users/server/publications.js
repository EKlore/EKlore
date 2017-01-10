import { Meteor } from 'meteor/meteor';

import { Users } from '../schemq.js';

Meteor.publish('Users.allUsers', () => {
	return Users.find({});
});
