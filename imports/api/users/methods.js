import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { HTTP } from 'meteor/http';

Meteor.methods({
	addQuestionsGroupIntoUser(data) {
		let methodSchema = new SimpleSchema({
			userId: { type: String },
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);
		return Meteor.users.update({ _id: data.userId }, {
			$addToSet: {
				'profile.questionsGroups': data.questionsGroupId
			}
		});
	},
	becomeVolunteer(userId) {
		check(userId, String);
		return Meteor.users.update({ _id: userId }, {
			$set: {
				'profile.wantsToBeVolunteer': true
			}
		});
	},
	HTGetToken() {
		const options = {
			params: {
				grant_type: 'client_credentials',
				client_id: 'Eklore',
				client_secret: 'db94315f-9b10-4470-bbaa-aefcc62f6da0'
			},
			timeout: 3000
		};
		return HTTP.post('https://app.hellotalent.com/api/token', options, (result) => {
			return console.log(result);
		});
	}
});
