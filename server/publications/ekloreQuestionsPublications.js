Meteor.publish('allEkloreQuestions', () => {
	return EkloreQuestions.find({});
});
