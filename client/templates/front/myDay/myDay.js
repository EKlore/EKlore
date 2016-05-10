Template.myDay.helpers({
	workshops() {
		return Workshops.find({}, {
			sort: {
				dateStart: 1,
				name: 1
			}
		});
	},
	dateStart() {
		return moment(this.dateStart).format('H:mm');
	},
	dateEnd() {
		return moment(this.dateEnd).format('H:mm');
	},
	isUserAlreadyIn() {
		if (lodash.findIndex(this.peopleToGo, ['userId', Meteor.userId()]) !== -1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.myDay.events({
	'click .goToWorkshop' (event) {
		event.preventDefault();
		const data = {
			userId: Meteor.userId(),
			workshopId: this._id
		};
		Meteor.call('addUserToWorkshop', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	},
	'click .removeFromWorkshop' (event) {
		event.preventDefault();
		const data = {
			userId: Meteor.userId(),
			workshopId: this._id
		};
		Meteor.call('removeUserFromWorkshop', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
