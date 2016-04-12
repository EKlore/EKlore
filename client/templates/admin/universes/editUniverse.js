Template.editUniverse.helpers({
	workshops() {
		return Workshops.find({
			'universesLinked.universeId': {
				$ne: this._id
			}
		});
	}
});

Template.editUniverse.events({
	'click #save': function(event) {
		event.preventDefault();
		var universeData = {
			universeId: Router.current().params._id,
			name: $('#universeName').val(),
			label: $('#universeLabel').val()
		};
		if (!universeData.name) {
			return throwError('Name must be filled');
		}
		if (!universeData.label) {
			return throwError('Label must be filled');
		}
		if (universeData.name && universeData.label) {
			Meteor.call('updateAUniverse', universeData, (error, result) => {
				if (error) {
					return throwError(error.message);
				} else {
					return throwError('Update succesful !');
				}
			});
		}
	}
});
