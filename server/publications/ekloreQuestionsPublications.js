Meteor.publish('allEkloreQuestions', function() {
	return EkloreQuestions.find({});
});
