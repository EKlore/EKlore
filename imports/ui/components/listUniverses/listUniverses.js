import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Universes } from '../../../api/universes/schema.js';

import './listUniverses.jade';

Template.listUniverses.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUniverses');
	});
});

Template.listUniverses.helpers({
	universesCount() {
		return Universes.find({}).count();
	},
	universe() {
		return Universes.find({}, {
			fields: {
				name: 1,
				label: 1,
				workshopsLinked: 1
			},
			sort: {
				name: 1
			}
		});
	},
	myIndex(index) {
		return index + 1;
	}
});
