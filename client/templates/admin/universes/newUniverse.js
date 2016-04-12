Template.newUniverse.events({
	'click #addUniverse': function(event) {
		event.preventDefault();
		const universe = {
			name: $('#universeName').val(),
			label: $('#universeLabel').val()
		};
		if (!universe.name) {
			return throwError('Name must be filled');
		}
		if (!universe.label) {
			return throwError('Label must be filled');
		}
		if (universe.name && universe.label) {
			Meteor.call('addAUniverse', universe, (error, result) => {
				if (error) {
					return throwError(error.message);
				} else {
					Router.go('editUniverse', { _id: result });
				}
			});
		}
	}
});
