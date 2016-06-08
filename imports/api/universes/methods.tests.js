import { Meteor } from 'meteor/meteor';
import { chai, assert } from 'meteor/dispatch:mocha-phantomjs';

import { Universes } from './schema.js';

describe('universes methods', function() {
	it('should insert universe in the Universes collection', function() {
		let data = {
			name: 'Babar',
			label: 'Label for Babar'
		};
		Meteor.call('addAUniverse', data, function(error, result) {
			if (result) {
				let universeInDB = Universes.findOne({ _id: result });
				assert.equal(data.name, universeInDB.name, 'Babar = Babar');
				assert.equal(data.label, universeInDB.label, 'Label for Babar = Label for Babar');
				assert.equal(universeInDB.color, '#3355CC', 'Color is #3355CC for new universe');
				assert.lengthOf(universeInDB.workshopsLinked, 0, 'workshopsLinked has a length of 0');
				Universes.remove({ _id: result });
			}
		});
	});
	it('should update an universe', function() {
		let data = {
			name: 'Babar',
			label: 'Label for Babar'
		};
		Meteor.call('addAUniverse', data, function(error, result) {
			if (result) {
				data.universeId = result;
				data.name = 'Toto';
				data.label = 'Label for Toto';
				data.color = '#3355AA';
				Meteor.call('addAUniverse', data, function(error, result) {
					if (result) {
						let universeInDB = Universes.findOne({ _id: result });
						assert.equal(data.name, universeInDB.name, 'Toto = Toto');
						assert.equal(data.label, universeInDB.label, 'Label for Toto = Label for Toto');
						assert.equal(universeInDB.color, '#3355AA', 'Color is #3355AA');
						assert.lengthOf(universeInDB.workshopsLinked, 0, 'workshopsLinked has a length of 0');
					}
				});
			}
		});
	});
});
