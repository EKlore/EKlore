Template.newUniverse.events({
	'click #addUniverse': function(e) {
		e.preventDefault();
		var universe = {
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
			Meteor.call('addAUniverse', universe, function(error, result) {
				if (error) {
					return throwError(error.message);
				} else {
					Router.go('admin');
				}
			});
		}
	}
});
