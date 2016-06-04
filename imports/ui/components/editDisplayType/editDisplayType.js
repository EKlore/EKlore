import { Template } from 'meteor/templating';

import './editDisplayType.jade';

Template.editDisplayType.helpers({
	displayTypeIsText() {
		if (this.displayType === 'text') {
			return true;
		} else if (this.displayType === 'picture') {
			return false;
		}
	}
});
