Template.listUniverses.helpers({
	universesCount() {
		return Universes.find({}).count();
	},
	universe() {
		return Universes.find({}, {
			sort: {
				name: 1
			}
		});
	},
});
