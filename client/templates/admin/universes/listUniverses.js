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
	}
});
