Template.listWorkshops.helpers({
	workshopsCount: function() {
		return Workshops.find({}).count();
	},
	workshop: function() {
		return Workshops.find({}, {
			sort: {
				dateStart: 1
			}
		});
	},
	dateStart: function() {
		return moment(this.dateStart).format("D-MMM H:mm");
	},
	dateEnd: function() {
		return moment(this.dateEnd).format("D-MMM H:mm");
	}
});
