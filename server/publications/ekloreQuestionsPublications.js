Meteor.publish('allEKloreQuestions', function() {
	return EKloreQuestions.find({});
});
