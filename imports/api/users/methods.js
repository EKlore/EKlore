import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
	addQuestionsGroup(data) {
		check(data, Object);
		check(data.userId, String);
		check(data.questionsGroupId, String);
		return Meteor.users.update({ _id: data.userId }, {
			$addToSet: {
				'profile.questionsGroups': data.questionsGroupId
			}
		});
	}
});
