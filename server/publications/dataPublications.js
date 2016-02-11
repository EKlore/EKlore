Meteor.publish('test', function() {
	return Test.find({});
});
