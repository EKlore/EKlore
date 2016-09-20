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
			content: '',
			data: {},
			query: '',
			params: {
				grant_type: 'client_credentials',
				client_id: '',
				client_secret: ''
			},
			auth: 'username:password',
			header: {},
			timeout: 3000
		};
		HTTP.post('https://app.hellotalent.com/api/token')
	}
});
