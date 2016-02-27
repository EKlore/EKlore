Template.listWorkshops.helpers({
	workshopsCount() {
		return Workshops.find({}).count();
	},
	workshop() {
		return Workshops.find({}, {
			sort: {
				name: 1
			}
		});
	},
	dateStart() {
		return moment(this.dateStart).format("H:mm");
	},
	dateEnd() {
		return moment(this.dateEnd).format("H:mm");
	}
});
