import 'meteor/joshowens:shareit';

ShareIt.configure({
	sites: {
		facebook: {
			appId: 188855951547261
		}
	},
	classes: "btn-eklore btn", // string (default: 'large btn')
	// The classes that will be placed on the sharing buttons, bootstrap by default.
	iconOnly: false, // boolean (default: false)
	// Don't put text on the sharing buttons
	applyColors: false, // boolean (default: true)
	// apply classes to inherit each social networks background color
	faSize: '', // font awesome size
	faClass: '' // font awesome classes like square
});
