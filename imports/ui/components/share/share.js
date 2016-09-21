import { Template } from 'meteor/templating';

import 'meteor/joshowens:shareit';

import './share.jade';

Template.share.helpers({
	shareData() {
		return this;
	}
});
