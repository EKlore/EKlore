import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './admin.jade';
import '../../components/listUniverses/listUniverses.js';
import '../../components/listWorkshops/listWorkshops.js';
import '../../components/listQuestionsGroups/listQuestionsGroups.js';
import '../../components/listEkloreQuestions/listEkloreQuestions.js';

Template.admin.helpers({
	isAdmin() {
		return Meteor.user().profile.admin;
	}
});
