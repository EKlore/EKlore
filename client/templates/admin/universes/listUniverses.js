Template.listUniverses.helpers({
	universesCount: function() {
		return Universes.find({}).count();
	},
	universe: function() {
		return Universes.find({}, {
			sort: {
				name: 1
			}
		});
	},
});
