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
	'click #save' (event) {
		event.preventDefault();
		const data = {
			universeId: Router.current().params._id,
			name: $('#universeName').val(),
			label: $('#universeLabel').val(),
			color: $('#universeColor').val()
		};
		if (!data.name) {
			return throwError('Name must be filled');
		}
		if (!data.label) {
			return throwError('Label must be filled');
		}
		if (!data.color) {
			return throwError('Color must be filled');
		}
		Meteor.call('updateAUniverse', data, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				return throwError('Update succesful !');
			}
		});
	}
});
